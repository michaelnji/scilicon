<script>
  import products from "./../../../store/products.js";
  import { onMount } from "svelte";
  import { addToast } from "./../../../store/toast";
  import { fade, fly } from "svelte/transition";
  import db from "../../../scripts/dbManager";
  import _ from "underscore";
  import Icon from "./../../../_components/icon.svelte";
  import numberFunctions from "../../../scripts/numberFunctions.js";
  export let productName, unitName, unitPrice, amtInStock, id;
  let totalPrice = 0;
  let totalUnits;
  let amtleft;
  let allProducts = [];
  let currentProduct;
  onMount(() => {
    allProducts = db.getItemValue("SC_PRODUCTS").filter((e) => e.id !== id);
    currentProduct = db
      .getItemValue("SC_PRODUCTS")
      .filter((e) => e.id === id)[0];
    totalPrice = currentProduct.totalSold;
    amtleft = currentProduct.amtLeftForSale;
    totalUnits = amtInStock - amtleft;
  });
  function updateSales() {
    if (totalPrice >= unitPrice * amtInStock) {
      let message = ` ${productName}  sold out!!`;
      let timeout = 3000;
      let type = "warning";
      let dismissible = true;
      addToast({ message, type, dismissible, timeout });
      return;
    } else {
      totalPrice = totalPrice + unitPrice;
      totalUnits = totalUnits + 1;
      amtleft = amtInStock - totalUnits;
      currentProduct.totalSold = totalPrice;
      currentProduct.amtLeftForSale = amtleft;
      currentProduct.totalUnitsSold = totalUnits;
      // updating account details
      let accountInfo = db.getItemValue("SC_GENERAL_ACCOUNT");
      let archiveAccountInfo = db.getItemValue("SC_ARCHIVE_ACCOUNT");
      // add unit sold to current account balance
      accountInfo.currentAccountBalance =
        accountInfo.currentAccountBalance + unitPrice;
      archiveAccountInfo.currentAccountBalance =
        archiveAccountInfo.currentAccountBalance + unitPrice;
      // add unit sold to total amount generated from sales
      accountInfo.totalAmountFromSales =
        accountInfo.totalAmountFromSales + unitPrice;
      archiveAccountInfo.totalAmountFromSales =
        archiveAccountInfo.totalAmountFromSales + unitPrice;
      // reduce products left in stock by 1
      archiveAccountInfo.productsLeftInStock =
        archiveAccountInfo.productsLeftInStock - 1;
      accountInfo.productsLeftInStock = accountInfo.productsLeftInStock - 1;
      // increase total products sold by 1
      accountInfo.totalProductsSold = accountInfo.totalProductsSold + 1;
      archiveAccountInfo.totalProductsSold =
        archiveAccountInfo.totalProductsSold + 1;
      // calculate profit if total amount sold > capital
      if (totalPrice >= currentProduct.costPrice && amtleft == 0) {
        accountInfo.totalProfitMade =
          accountInfo.totalProfitMade + (totalPrice - currentProduct.costPrice);
        archiveAccountInfo.totalProfitMade =
          archiveAccountInfo.totalProfitMade +
          (totalPrice - currentProduct.costPrice);
      }
      // update info in localStorage
      db.setItemValue("SC_GENERAL_ACCOUNT", accountInfo);
      db.setItemValue("SC_ARCHIVE_ACCOUNT", archiveAccountInfo);
      products.update((value) => {
        return db.setItemValue("SC_PRODUCTS", [...allProducts, currentProduct]);
      });
    }
  }
</script>

<div
  class="bg-base-100 rounded-2xl mx-2 my-4 shadow-lg px-6 pt-8 py-4 relative"
>
  {#if totalPrice >= unitPrice * amtInStock}
    <span
      in:fade
      class="btn btn-primary text-primary bg-opacity-20 absolute -left-2 -top-2 btn-sm border-0"
      ><Icon name="badge-check" />

      <b class="capitalize ml-3">sold out!</b>
    </span>
  {/if}
  <div class="flex justify-between">
    <div>
      <span class="text-xs text-base-content capitalize text-opacity-50"
        >item name</span
      >
      <h2 class="capitalize text-primary font-bold text-lg">{productName}</h2>
    </div>
    <div>
      <span class="text-xs text-base-content capitalize text-opacity-50"
        >units sold</span
      >
      <h2
        class="capitalize text-info font-bold text-md"
        in:fly={{ duration: 400, y: -100, delay: 600 }}
      >
        +{numberFunctions.formatNum(totalUnits)}
        {unitName}
      </h2>
    </div>
  </div>
  <div>
    <h2 class="capitalize  font-extrabold text-3xl text-info my-2">
      +{numberFunctions.formatNum(totalPrice)}
      <span class="text-base-content uppercase text-xl">fcfa</span>
    </h2>
    <div class="flex justify-between">
      <h2 class="capitalize font-bold text-base flex text-success">
        {numberFunctions.formatNum(amtleft)} left
      </h2>
      <button
        class="btn btn-outline btn-primary capitalize btn-sm "
        on:click={updateSales}
      >
        <Icon name="plus" /><span class="ml-2 hidden md:inline">add unit</span
        ></button
      >
    </div>
  </div>
</div>

<style>
</style>
