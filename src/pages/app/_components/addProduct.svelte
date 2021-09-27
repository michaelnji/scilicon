<script>
  import products from "./../../../store/products.js";
  import Icon from "./../../../_components/icon.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { v4 as uuidv4 } from "uuid";
  import timeFunctions from "../../../scripts/timeFunctions";
  import db from "../../../scripts/dbManager";
  let productName,
    productId,
    productAmt,
    productUnitPrice,
    productUnitName,
    isProductMeasurable,
    productCreationDate,
    productCP,
    productSP,
    productProjectedGain,
    Products,
    subscribe;
  onMount(() => {
    subscribe = products.subscribe((value) => {
      Products = value;
    });
  });
  onDestroy(() => {
    subscribe;
  });
  let isOpen = false;
  const dispatch = createEventDispatcher();
  function closeModal() {
    isOpen = !isOpen;
  }
  function triggerSuccessEvent() {
    productId = uuidv4();
    // FIXME : change format of date to : dd/mm/yyyy
    productCreationDate = timeFunctions.today();
    productSP = productAmt * productUnitPrice;
    productProjectedGain = productSP - productCP;
    let finalProduct = {
      name: productName,
      index: db.getItemValue("PI"),
      costPrice: productCP,
      sellingPrice: productSP,
      grossGain: productProjectedGain,
      creationDate: productCreationDate,
      id: productId,
      amount: productAmt,
      initialStock: productAmt,
      totalSold: 0,
      totalUnitsSold: 0,
      amtLeftForSale: productAmt,
      unitName: productUnitName,
      unitPrice: productUnitPrice,
      isMeasurable: isProductMeasurable ? isProductMeasurable : false,
    };
    products.update((value) => {
      return db.setItemValue("SC_PRODUCTS", [finalProduct, ...Products]);
    });
    // updating global account details
    let accountInfo = db.getItemValue("SC_GENERAL_ACCOUNT");
    accountInfo.totalProductsStock =
      accountInfo.totalProductsStock + productAmt;
    if (accountInfo.productsLeftInStock > 0) {
      accountInfo.productsLeftInStock =
        accountInfo.productsLeftInStock + productAmt;
    } else {
      accountInfo.productsLeftInStock = productAmt;
    }
    accountInfo.projectedSales = productAmt * productUnitPrice;
    accountInfo.projectedProfit =
      accountInfo.projectedProfit + (productSP - productCP);
    db.setItemValue("SC_GENERAL_ACCOUNT", accountInfo);
    //  resetting data
    productName = "";
    productAmt = "";
    productUnitName = "";
    productUnitPrice = "";
    isProductMeasurable = false;
    productCP = "";
    db.setItemValue("PI", db.getItemValue("PI") + 1);
    closeModal();
  }
  function triggerCancelEvent() {
    //    oN Cancel
    closeModal();
  }
</script>

<button
  class="capitalize btn btn-primary fixed bottom-4 right-4  shadow-xl  btn-md z-20  flex item-center  rounded-box "
  on:click={closeModal}
  ><Icon name="plus" />
  <span class="hidden ml-3 lg:inline">Add product</span></button
>
{#if isOpen}
  <div
    class="w-screen px-2 pt-3 h-screen hero-overlay left-0 fixed top-0 overflow-scroll grid md:place-items-center cursor-d   place-items-end z-50 "
    transition:fade={{ duration: 300 }}
  >
    <div
      class="p-4 md:px-6 bg-base-100 w-full md:max-w-sm lg:max-w-md shadow-2xl z-50 rounded-t-box md:rounded-box "
    >
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xl md:text-2xl font-bold text-primary capitalize">
          Add Product
        </h3>

        <button
          class="btn btn-ghost btn-circle  btn-sm mb-4"
          on:click|preventDefault={closeModal}><Icon name="x" /></button
        >
      </div>
      <!-- main content -->
      <form class="mb-8   grid grid-cols-1 gap-y-3  ">
        <div class="form-control">
          <label class="label" for="product name">
            <span class="label-text">Product Name</span>
          </label>
          <input
            placeholder="fish"
            bind:value={productName}
            name="product name"
            class="input input-bordered"
            type="text"
          />
        </div>
        <div class="form-control">
          <label class="label" for="product cost price">
            <span class="label-text">Product Cost Price (FCFA)</span>
          </label>
          <input
            placeholder="6000"
            bind:value={productCP}
            name="product cost price"
            class="input input-bordered"
            type="number"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-3 md:gap-x-2">
          <div class="form-control">
            <label class="label" for="Amount">
              <span class="label-text">Amount</span>
            </label>
            <input
              placeholder="00"
              bind:value={productAmt}
              name="Amount"
              class="input input-bordered"
              type="number"
            />
          </div>
          <div class="form-control">
            <label class="label" for="unit price">
              <span class="label-text">Unit Price (FCFA)</span>
            </label>
            <input
              placeholder="10"
              name="unit price "
              bind:value={productUnitPrice}
              class="input input-bordered"
              type="number"
            />
          </div>
          <div class="form-control">
            <label class="label" for="unit name">
              <span class="label-text">Unit Name</span>
            </label>
            <input
              bind:value={productUnitName}
              placeholder="pieces"
              name="unit name"
              class="input input-bordered"
              type="text"
            />
          </div>
          <div class="pt-10 px-2">
            <div class="form-control">
              <label class="cursor-pointer label">
                <span class="label-text font-bold capitalize"
                  >Is Measurable
                </span>
                <input
                  type="checkbox"
                  bind:checked={isProductMeasurable}
                  class="toggle toggle-primary mr-auto ml-8"
                />
              </label>
            </div>
          </div>
        </div>
      </form>
      <div>
        <button
          class="btn btn-primary capitalize btn-sm mr-3 sm:btn-md"
          on:click|preventDefault={triggerSuccessEvent}>Add Product</button
        >
        <button
          class="btn btn-ghost capitalize btn-sm sm:btn-md"
          on:click|preventDefault={triggerCancelEvent}>cancel</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .hero-overlay {
    min-width: 100vw !important;
    min-height: 100vh !important;
  }
</style>
