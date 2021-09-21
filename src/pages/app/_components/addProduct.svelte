<script>
  import Icon from "./../../../_components/icon.svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let isOpen;
  const dispatch = createEventDispatcher();
  function closeModal() {
    isOpen = false;
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

{#if isOpen}
  <div class="modal  modal-open" transition:fade>
    <div class="modal-box">
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
      <form class="mb-8 md:mb-4  grid grid-cols-1 gap-y-3">
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
          <div class="pt-6 px-2">
            <div class="form-control">
              <label class="cursor-pointer label">
                <span class="label-text">Is Measurable </span>
                <input
                  type="checkbox"
                  checked="checked"
                  class="toggle toggle-primary"
                />
              </label>
            </div>
          </div>
        </div>
      </form>
      <div class="modal-action">
        <button
          class="btn btn-primary capitalize btn-sm sm:btn-md"
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
</style>
