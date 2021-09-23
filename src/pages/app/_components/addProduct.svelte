<script>
  import Icon from "./../../../_components/icon.svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const id = "addproduct";
  let isOpen = false;
  const dispatch = createEventDispatcher();
  function closeModal() {
    isOpen = !isOpen;
  }
  function triggerSuccessEvent() {
    // on add product
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
            name="product name"
            class="input input-bordered"
            type="text"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-3 md:gap-x-2">
          <div class="form-control">
            <label class="label" for="Amount">
              <span class="label-text">Amount</span>
            </label>
            <input
              placeholder="00"
              name="Amount"
              class="input input-bordered"
              type="text"
            />
          </div>
          <div class="form-control">
            <label class="label" for="unit price">
              <span class="label-text">Unit Price</span>
            </label>
            <input
              placeholder="10FCFA"
              name="unit price"
              class="input input-bordered"
              type="text"
            />
          </div>
          <div class="form-control">
            <label class="label" for="unit name">
              <span class="label-text">Unit Name</span>
            </label>
            <input
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
                  checked="checked"
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
