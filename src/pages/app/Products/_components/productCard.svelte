<script>
  import { fade } from "svelte/transition";
  import db from "../../../../scripts/dbManager";
  import numberFunctions from "../../../../scripts/numberFunctions";
  import products from "../../../../store/products";
  import { addToast } from "../../../../store/toast";
  import Icon from "./../../../../_components/icon.svelte";
  export let productName, amtInStock, unitPrice, unitName, id;
  let totalPrice = amtInStock * unitPrice;
  function deleteItem() {
    products.update((value) => {
      return db.setItemValue(
        "SC_PRODUCTS",
        db.getItemValue("SC_PRODUCTS").filter((e) => e.id !== id)
      );
    });
    let accountInfo = db.getItemValue("SC_GENERAL_ACCOUNT");
    accountInfo.productsLeftInStock =
      accountInfo.productsLeftInStock - amtInStock;
    db.setItemValue("SC_GENERAL_ACCOUNT", accountInfo);
    let message = ` ${productName}  deleted`;
    let timeout = 2000;
    let type = "error";
    let dismissible = false;
    addToast({ message, type, dismissible, timeout });
  }
</script>

<div class="bg-base-100 rounded-lg mx-2 my-4 shadow-lg px-6 relative py-8">
  {#if amtInStock == 0}
    <span
      in:fade
      class="btn btn-primary text-primary bg-opacity-20 absolute -left-2 -top-2 btn-sm border-0"
      ><Icon name="badge-check" />

      <b class="capitalize ml-3">sold out!</b>
    </span>
  {/if}
  <div class="flex justify-between">
    <div>
      <span class="text-sm text-base-content capitalize text-opacity-80"
        >item Name</span
      >
      <h2 class="capitalize text-primary font-bold text-lg">{productName}</h2>
    </div>
    <div>
      <span class="text-sm text-base-content capitalize text-opacity-80"
        >unit price</span
      >
      <h2 class="capitalize text-info font-bold text-md">
        {numberFunctions.formatNum(unitPrice)}
        FCFA
      </h2>
    </div>
  </div>
  <div class="mt-3">
    <span class="text-sm text-base-content capitalize text-opacity-80 "
      >Amount in stock</span
    >
    <h2 class="capitalize  font-extrabold text-3xl text-info mb-2 mt-0">
      {numberFunctions.formatNum(amtInStock)}
      <span class="text-base-content  text-xl">{unitName} </span>
    </h2>
    <div class="flex justify-between mt-8">
      <h2 class="capitalize font-bold text-sm sm:text-base flex text-success">
        <span class="text-base-content mr-1 "> total(FCFA) :</span>
        {numberFunctions.formatNum(totalPrice)}
      </h2>

      <div class="dropdown dropdown-top dropdown-left ">
        <button class="btn btn-ghost btn-primary capitalize btn-sm ">
          <Icon name="dots-horizontal" /></button
        >
        <ul class="menu dropdown-content bg-base-200 shadow-lg rounded-md p-3">
          <li>
            <a href={"/app/stat/product/" + id} class="btn btn-ghost capitalize"
              >stats</a
            >
            <button class="btn btn-ghost capitalize" on:click={deleteItem}
              >delete</button
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
</style>
