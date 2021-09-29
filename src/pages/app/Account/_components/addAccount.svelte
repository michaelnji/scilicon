<script>
  import Icon from "./../../../../_components/icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import { fade } from "svelte/transition";
  import timeFunctions from "../../../../scripts/timeFunctions";
  import accounts from "../../../../store/account";
  import dbManager from "../../../../scripts/dbManager";
import { addToast } from "../../../../store/toast";
  let creditName, creditAmt;
  const id = "addproduct";
  let isOpen = false;
  let isTabActive = true;
  const dispatch = createEventDispatcher();

  // closes modal
  function closeModal() {
    isOpen = !isOpen;
  }

  function addCreditItem() {
    // on add credit
    let creditAccount = dbManager.getItemValue("SC_CREDIT_ACCOUNT");
    let item = {};
    item.name = creditName;
    item.date = timeFunctions.today();
    item.id = uuidv4();
    item.amount = creditAmt;
    dbManager.setItemValue("SC_CREDIT_ACCOUNT", [...creditAccount, item]);
    accounts.update((value) => {
      return [];
    }); 
      let message = ` success`;
    let timeout = 2000;
    let type = "success";
    let dismissable = false;
    addToast({ message, type, dismissable, timeout });
    creditName = "";
    creditAmt = 0;
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
      <!-- main content -->

      <div class="flex items-center justify-between">
        <h3 class="text-xl md:text-2xl font-bold text-primary capitalize my-4">
          new credit
        </h3>
        <button class="btn btn-ghost btn-sm" on:click={closeModal}
          ><Icon name="x" /></button
        >
      </div>
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
              bind:value={creditName}
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
              type="number"
              bind:value={creditAmt}
            />
          </div>
        </form>
      </div>

      <div>
        <button
          class="btn btn-primary capitalize btn-sm mr-3 sm:btn-md"
          on:click|preventDefault={addCreditItem}
        >
          add Credit
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
