<script>
  import Icon from "./../../../_components/icon.svelte";
  import { fade, fly } from "svelte/transition";
  import ProductList from "./_components/productList.svelte";
  import TodayStats from "./../_components/todayStats.svelte";
  import { metatags } from "@roxi/routify";
  metatags.title = "Overview";
</script>

<div in:fly={{ duration: 400, y: -100, delay: 300 }}>
  <h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">
    Overview
  </h1>
  <h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
    Products
  </h2>

  <ProductList />
  <div class="flex items-center  mt-12">
    <h2
      class="text-base-content md:text-2xl text-xl font-bold  text-opacity-80 capitalize"
    >
      statistics
    </h2>
    <a href="/app/Stats/" class="btn btn-link btn-secondary ml-4"
      >see more <span class="ml-1"><Icon name="arrow-right-sm" /></span></a
    >
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
    <TodayStats />
  </div>
</div>
