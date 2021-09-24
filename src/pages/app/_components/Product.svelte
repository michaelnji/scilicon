<script>
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";
  import db from "../../../scripts/dbManager";

  import Icon from "./../../../_components/icon.svelte";
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
    console.log(currentProduct);
    totalPrice = currentProduct.totalSold;
    amtleft = currentProduct.amtLeftForSale;
    totalUnits = amtInStock - amtleft;
    console.log(amtleft);
  });
  function updateSales() {
    if (totalPrice >= unitPrice * amtInStock) {
      return;
    } else {
      totalPrice = totalPrice + unitPrice;
      totalUnits = totalUnits + 1;
      amtleft = amtInStock - totalUnits;
      currentProduct.totalSold = totalPrice;
      currentProduct.amtLeftForSale = amtleft;
      db.setItemValue("SC_PRODUCTS", [currentProduct, ...allProducts]);
    }
  }
</script>

<div
  class="bg-base-100 rounded-box mx-2 my-4 shadow-lg px-3 pt-8 py-4 relative"
>
  {#if totalPrice >= unitPrice * amtInStock}
    <span
      transition:fade
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
      <h2 class="capitalize text-info font-bold text-md">
        +{totalUnits}
        {unitName}
      </h2>
    </div>
  </div>
  <div>
    <h2 class="capitalize  font-extrabold text-3xl text-info my-2">
      +{totalPrice}
      <span class="text-base-content uppercase text-xl">fcfa</span>
    </h2>
    <div class="flex justify-between">
      <h2 class="capitalize font-bold text-base flex text-success">
        {amtleft} left
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
