<script>
  import { fade } from "svelte/transition";
  import accounts from "./../../../../store/account.js";
  import { onDestroy, onMount } from "svelte";
  import _ from "underscore";
  import Icon from "./../../../../_components/icon.svelte";
  import dbManager from "../../../../scripts/dbManager.js";
  import { addToast } from "../../../../store/toast.js";
  import { flip } from "svelte/animate";
  import nf from "../../../../scripts/numberFunctions.js";
  export let source;
  let accountInfo, subscribe, accountTable, archiveAccountInfo, total;
  total = 0;
  let products, product;
  onMount(() => {
    // subscribe to account store
    // to be used as a reactive way rerender the credit table
    subscribe = accounts.subscribe((value) => {
      accountTable = value;
    });
    // all credit items
    accountInfo = dbManager.getItemValue(source);
    archiveAccountInfo = dbManager.getItemValue("SC_ARCHIVE_ACCOUNT");
    // calculates the total amount taken as credit
    if (accountInfo.length > 0) {
      total = _.reduce(
        _.pluck(accountInfo, "amount"),
        function (memo, num) {
          return memo + num;
        },
        0
      );
    } else {
      total = 0;
    }
  });
  onDestroy(() => {
    subscribe;
  });
  // gets fresh info from localStorage and rerenders the list automatically when the account store is updated
  $: {
    if (accountTable) {
      accountInfo = dbManager.getItemValue(source);

      // recalculates the total amount borrowed
      if (accountInfo.length > 0) {
        total = _.reduce(
          _.pluck(accountInfo, "amount"),
          function (memo, num) {
            return memo + num;
          },
          0
        );
      } else {
        total = 0;
      }
    }
  }
  // 'pays the debt'
  /* 
  @params id : String
  */
  function pay(id) {
    // all products in localStorage
    products = dbManager.getItemValue("SC_PRODUCTS");
    // product whose name matches the name of the current credit item with id
    product = products.filter(
      (e) =>
        e.name ===
        dbManager.getItemValue(source).filter((e) => e.id === id)[0].name
    )[0];
    // current credit item
    let creditItem = dbManager
      .getItemValue(source)
      .filter((e) => e.id === id)[0];
    // general account info
    let accountInfo = dbManager.getItemValue("SC_GENERAL_ACCOUNT");
    let archiveAccountInfo = dbManager.getItemValue("SC_ARCHIVE_ACCOUNT");
    // amount paid is added to total amount generated from sale
    accountInfo.totalAmountFromSales =
      accountInfo.totalAmountFromSales +
      dbManager.getItemValue(source).filter((e) => e.id === id)[0].amount;
    archiveAccountInfo.totalAmountFromSales =
      archiveAccountInfo.totalAmountFromSales +
      dbManager.getItemValue(source).filter((e) => e.id === id)[0].amount;
    // amount paid is added to current account balance
    accountInfo.currentAccountBalance =
      accountInfo.currentAccountBalance +
      dbManager.getItemValue(source).filter((e) => e.id === id)[0].amount;
    archiveAccountInfo.currentAccountBalance =
      archiveAccountInfo.currentAccountBalance +
      dbManager.getItemValue(source).filter((e) => e.id === id)[0].amount;
    // amount of borrowed products is added to amount of products sold
    accountInfo.totalProductsSold =
      accountInfo.totalProductsSold + creditItem.amount / product.unitPrice;
    archiveAccountInfo.totalProductsSold =
      archiveAccountInfo.totalProductsSold +
      creditItem.amount / product.unitPrice;
    // amount  borrowed is added to amount sold in that individual products account
    product.totalSold = product.totalSold + creditItem.amount;
    products = products.filter(
      (e) =>
        e.name !==
        dbManager.getItemValue(source).filter((e) => e.id === id)[0].name
    );
    if (product.totalSold >= product.costPrice) {
      accountInfo.totalProfitMade =
        accountInfo.totalProfitMade + (product.totalSold - product.costPrice);
      archiveAccountInfo.totalProfitMade =
        archiveAccountInfo.totalProfitMade +
        (product.totalSold - product.costPrice);
    }
    //  updating all localStorage info
    dbManager.setItemValue("SC_PRODUCTS", [...products, product]);
    dbManager.setItemValue("SC_GENERAL_ACCOUNT", accountInfo);
    dbManager.setItemValue("SC_ARCHIVE_ACCOUNT", archiveAccountInfo);
    dbManager.setItemValue(
      source,
      dbManager.getItemValue(source).filter((e) => e.id !== id)
    );
    // alerting with a toast that the item has been removed
    let message = `paid successfully`;
    let timeout = 2000;
    let type = "success";
    let dismissible = false;
    addToast({ message, type, dismissible, timeout });
    // update the account store (with anything you want) so all reactive statements referencing it can auto run
    accounts.update((value) => {
      return [];
    });
  }
</script>

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
      {#if accountInfo && accountInfo.length > 0}
        {#each accountInfo as info (info.id)}
          <tr animate:flip={{ duration: 500 }}>
            <td class=" text-xs sm:text-base flex items-center"
              >{info.name}
              <button class="btn btn-ghost btn-sm ml-4" on:click={pay(info.id)}
                ><Icon name="check" /></button
              ></td
            >
            <td class="text-xs sm:text-base">{nf.formatNum(info.amount)}</td>
            <td class="text-xs sm:text-base">{info.date}</td>
          </tr>
        {/each}
      {:else}
        <tr in:fade>
          <td class="text-xs sm:text-base">none</td>
          <td class="text-xs sm:text-base">0</td>
          <td class="text-xs sm:text-base">0</td>
        </tr>
      {/if}

      <tr />
    </tbody>

    <tr>
      <td class=" text-xs sm:text-base font-extrabold">TOTAL</td>
      <td class="text-xs sm:text-base" />
      <td class="text-sm sm:text-xl text-primary font-extrabold"
        >{nf.formatNum(total)}fcfa</td
      >
    </tr>
  </table>
</div>

<style>
</style>
