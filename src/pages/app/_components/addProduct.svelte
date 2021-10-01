<script>
  import products from "./../../../store/products.js";
  import Icon from "./../../../_components/icon.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import pm from "../../../scripts/productsManager";
  import { fade, scale } from "svelte/transition";
  let productName,
    productAmt,
    productUnitPrice,
    productUnitName,
    isProductMeasurable,
    productCP,
    Products,
    subscribe;
  let isOpen = false;
  onMount(() => {
    subscribe = products.subscribe((value) => {
      Products = value;
    });
  });
  onDestroy(() => {
    subscribe;
  });
  function closeModal() {
    isOpen = !isOpen;
  }
  function triggerSuccessEvent() {
    pm.addProduct(
      productName,
      productAmt,
      productUnitName,
      productUnitPrice,
      isProductMeasurable,
      productCP,
      Products
    );
    //  resetting data
    productName = "";
    productAmt = "";
    productUnitName = "";
    productUnitPrice = "";
    isProductMeasurable = false;
    productCP = "";
    closeModal();
  }
  function triggerCancelEvent() {
    //    oN Cancel
    closeModal();
  }
</script>

<button
  class="capitalize btn btn-primary fixed bottom-4 right-4  shadow-xl  btn-md z-20  flex item-center  rounded-box"
  on:click={closeModal}
  ><Icon name="plus" />
  <span class="hidden ml-3 md:inline">Add product</span></button
>
{#if isOpen}
  <div
    class="w-screen h-screen hero-overlay left-0 fixed top-0 overflow-scroll grid place-items-center z-50 "
    transition:fade={{ duration: 300 }}
  >
    <div
      out:scale={{ duration: 300 }}
      class="p-4 md:px-6 bg-base-100 w-11/12 md:max-w-md shadow-2xl z-50 rounded-t-box md:rounded-box mx-auto  my-auto overflow-visible px-3"
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
