<script>
  import products from "./../../../store/products.js";
  import { onDestroy, onMount } from "svelte";
  import Icon from "./../../../_components/icon.svelte";
  import dbManager from "../../../scripts/dbManager.js";
  import _ from "underscore";
  let allProducts, totalSales, percentageSold, accountInfo, subscribe;
  percentageSold = 0;
  onMount(() => {
    subscribe = products.subscribe((value) => {
      allProducts = value;
    });
    accountInfo = dbManager.getItemValue("SC_GENERAL_ACCOUNT");
    totalSales = accountInfo.totalProductsSold;
  });
  onDestroy(() => {
    subscribe;
  });
  $: {
    if (allProducts) {
      accountInfo = dbManager.getItemValue("SC_GENERAL_ACCOUNT");
      totalSales = accountInfo.totalProductsSold;
    }
  }
</script>

<div
  class=" grid-flow-row lg:grid-flow-col md:w-full shadow-lg stats bg-base-100"
>
  <div class="stat border-transparent">
    <div class="stat-figure text-secondary">
      <Icon name="globe" />
    </div>
    <div class="stat-title capitalize">total sales</div>
    <div class="stat-value">{totalSales}</div>
  </div>

  <div class="stat border-transparent">
    <div class="stat-figure text-secondary">
      <Icon name="flag" />
    </div>
    <div class="stat-title capitalize">total products</div>
    {#if allProducts}
      <div class="stat-value">{allProducts.length}</div>
    {:else}
      <div class="stat-value">0</div>
    {/if}
  </div>
</div>

<style>
</style>
