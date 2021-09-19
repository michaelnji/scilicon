<script>
  import TodayStats from "./../_components/todayStats.svelte";
  import Product from "./../_components/Product.svelte";
  import AddItem from "./../../../_components/AddItem.svelte";
</script>

<AddItem />
<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Overview</h1>
<h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
  Products
</h2>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
  <Product
    productName="Sardine"
    totalPrice="200"
    totalUnits="5"
    grossPercentage="10"
    unitName="spoons"
  />
  <Product
    productName="bread"
    totalPrice="800"
    totalUnits="8"
    grossPercentage="80"
    unitName="pieces"
  />
  <Product
    productName="butter"
    totalPrice="100"
    totalUnits="2"
    grossPercentage="30"
    unitName="spoons"
  />
  <Product
    productName="chocolate"
    totalPrice="200"
    totalUnits="8"
    grossPercentage="80"
    unitName="spoons"
  />
</div>
<h2
  class="text-base-content md:text-2xl text-xl font-bold  mt-8 text-opacity-80 capitalize"
>
  statistics
</h2>

<div class="grid grid-cols-1  lg:grid-cols-2 mt-4">
  <TodayStats />
</div>
