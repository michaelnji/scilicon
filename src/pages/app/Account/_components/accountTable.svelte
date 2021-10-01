<script>
  import { fade, fly } from "svelte/transition";
  import accounts from "./../../../../store/account.js";
  import { onDestroy, onMount } from "svelte";
  import _ from "underscore";
  import Icon from "./../../../../_components/icon.svelte";
  import dbManager from "../../../../scripts/dbManager.js";
  import { addToast } from "../../../../store/toast.js";
  import { flip } from "svelte/animate";
  export let source;
  let accountInfo, subscribe, accountTable, total;
  total = 0;
  onMount(() => {
    subscribe = accounts.subscribe((value) => {
      accountTable = value;
    });
    accountInfo = dbManager.getItemValue(source);
    if (accountInfo.length > 0) {
      total = _.reduce(
        _.pluck(accountInfo, "amount"),
        function (memo, num) {
          return memo + num;
        },
        0
      );
    }
  });
  onDestroy(() => {
    subscribe;
  });
  $: {
    if (accountTable) {
      accountInfo = dbManager.getItemValue(source);
      if (accountInfo.length > 0) {
        total = _.reduce(
          _.pluck(accountInfo, "amount"),
          function (memo, num) {
            return memo + num;
          },
          0
        );
      }
    }
  }
  function pay(id) {
    dbManager.setItemValue(
      source,
      dbManager.getItemValue(source).filter((e) => e.id !== id)
    );
    let message = ` paid successfully`;
    let timeout = 2000;
    let type = "success";
    let dismissable = false;
    addToast({ message, type, dismissable, timeout });
    accounts.update((value) => {
      return [];
    });
  }
</script>

{#if accountInfo && accountInfo.length > 0}
  <div class=" max-w-full  overflow-x-auto " in:fade>
    <table class="table w-full table-zebra">
      <thead>
        <tr>
          <td class="text-primary font-bold">Item</td>
          <td class="text-primary font-bold">Amt</td>
          <td class="text-primary font-bold">Date</td>
        </tr>
      </thead>
      <tbody>
        {#each accountInfo as info (info.id)}
          <tr animate:flip={{ duration: 500 }}>
            <td class=" text-xs sm:text-base flex items-center"
              >{info.name}
              <button class="btn btn-ghost btn-sm ml-4" on:click={pay(info.id)}
                ><Icon name="check" /></button
              ></td
            >
            <td class="text-xs sm:text-base">{info.amount}</td>
            <td class="text-xs sm:text-base">{info.date}</td>
          </tr>
        {/each}

        <tr />
      </tbody>

      <tr>
        <td class=" text-xs sm:text-base font-extrabold">TOTAL</td>
        <td class="text-xs sm:text-base" />
        <td class="text-sm sm:text-xl text-primary font-extrabold"
          >{total}fcfa</td
        >
      </tr>
    </table>
  </div>
{:else}
  <h1
    class="text-primary text-opacity-20 font-extrabold text-3xl sm:text-4xl md:text-6xl"
    in:fly={{ y: 500 }}
  >
    No expenses
  </h1>{/if}

<style>
</style>
