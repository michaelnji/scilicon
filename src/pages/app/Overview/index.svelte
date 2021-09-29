<script>
  import ProductList from "./_components/productList.svelte";
  import TodayStats from "./../_components/todayStats.svelte";
  import { metatags } from "@roxi/routify";
  metatags.title = "Overview";
</script>

<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Overview</h1>
<h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
  Products
</h2>

<ProductList />
<h2
  class="text-base-content md:text-2xl text-xl font-bold  mt-8 text-opacity-80 capitalize"
>
  statistics
</h2>

<div class="grid grid-cols-1  lg:grid-cols-2 mt-4">
  <TodayStats />
</div>
