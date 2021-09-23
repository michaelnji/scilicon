<script>
  import Icon from "./../../../../_components/icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";

  const id = "addproduct";
  let isOpen = false;
  let isTabActive = true;
  const dispatch = createEventDispatcher();

  // closes modal
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
  function changeTab() {
    isTabActive = !isTabActive;
  }
</script>

<button
  class="capitalize btn btn-primary fixed bottom-4 right-4  shadow-xl  btn-md z-20  flex item-center  rounded-box "
  on:click={closeModal}
  ><Icon name="plus" />
  <span class="hidden ml-3 lg:inline">Add item</span></button
>
{#if isOpen}
  <div
    class="w-screen px-2 pt-3 h-screen hero-overlay left-0 fixed top-0 overflow-scroll grid md:place-items-center cursor-d   place-items-end z-50 "
    transition:fade
  >
    <div
      class="p-4 md:px-6 bg-base-100 w-full md:max-w-sm lg:max-w-md shadow-2xl z-50 rounded-t-box md:rounded-box "
    >
      <div class="flex items-center justify-between mb-2">
        <div class="tabs tabs-boxed">
          <span class="tab " class:tab-active={isTabActive} on:click={changeTab}
            >Credit</span
          >
          <span class="tab" class:tab-active={!isTabActive} on:click={changeTab}
            >Expense</span
          >
        </div>

        <button
          class="btn btn-ghost btn-circle  btn-sm mb-4"
          on:click|preventDefault={closeModal}><Icon name="x" /></button
        >
      </div>

      <!-- main content -->
      {#if isTabActive}
        <h3 class="text-xl md:text-2xl font-bold text-primary capitalize my-4">
          new credit
        </h3>
        <div>
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
          </form>
        </div>
      {:else}
        <h3 class="text-xl md:text-2xl font-bold text-primary capitalize my-4">
          new expense
        </h3>
        <div>
          <form class="mb-8   grid grid-cols-1 gap-y-3  ">
            <div class="form-control">
              <label class="label" for="product name">
                <span class="label-text">Name</span>
              </label>
              <input
                placeholder="fish"
                name="product name"
                class="input input-bordered"
                type="text"
              />
            </div>

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
          </form>
        </div>
      {/if}
      <div>
        <button
          class="btn btn-primary capitalize btn-sm mr-3 sm:btn-md"
          on:click|preventDefault={triggerSuccessEvent}
        >
          {#if isTabActive}
            Add credit
          {:else}
            Add Expense
          {/if}
        </button>
        <button
          class="btn btn-ghost capitalize btn-sm sm:btn-md"
          on:click|preventDefault={triggerCancelEvent}>cancel</button
        >
      </div>
    </div>
  </div>
{/if}

<style></style>
