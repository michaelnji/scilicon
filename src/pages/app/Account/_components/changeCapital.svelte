<script>
  import Icon from "./../../../../_components/icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import { fade } from "svelte/transition";
  import timeFunctions from "../../../../scripts/timeFunctions";
  import accounts from "../../../../store/account";
  import dbManager from "../../../../scripts/dbManager";
  import { addToast } from "../../../../store/toast";
  let capitalAmt;
  let isOpen = false;
  const dispatch = createEventDispatcher();

  // closes modal
  function closeModal() {
    isOpen = !isOpen;
  }

  function changeValue() {
    let accountInfo = dbManager.getItemValue("SC_GENERAL_ACCOUNT");
    accountInfo.capital = capitalAmt;
    dbManager.setItemValue("SC_GENERAL_ACCOUNT", accountInfo);
    accounts.update((value) => {
      return [];
    });
    let message = `changed`;
    let timeout = 2000;
    let type = "success";
    let dismissable = false;
    addToast({ message, type, dismissable, timeout });
    capitalAmt = "";
    closeModal();
  }

  function triggerCancelEvent() {
    //    oN Cancel
    closeModal();
  }
</script>

<button class="btn btn-accent btn-sm capitalize " on:click={closeModal}>
  change</button
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
          new capital value
        </h3>
        <button class="btn btn-ghost btn-sm" on:click={closeModal}
          ><Icon name="x" /></button
        >
      </div>
      <div>
        <form class="mb-8   grid grid-cols-1 gap-y-3  ">
          <div class="form-control">
            <label class="label" for="Amount">
              <span class="label-text">Amount</span>
            </label>
            <input
              placeholder="00"
              name="Amount"
              class="input input-bordered"
              type="number"
              bind:value={capitalAmt}
            />
          </div>
        </form>
      </div>

      <div>
        <button
          class="btn btn-primary capitalize btn-sm mr-3 sm:btn-md"
          on:click|preventDefault={changeValue}
        >
          change
        </button>

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
