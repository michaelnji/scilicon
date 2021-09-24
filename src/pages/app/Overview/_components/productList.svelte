<script>
  import Product from "./../../_components/Product.svelte";
  import products from "./../../../../store/products.js";
  import db from "../../../../../../avecas/src/scripts/dbManager";
  import { onDestroy, onMount } from "svelte";
  let currentProducts, totalProducts, grossGain, totalSales, subscribe;
  currentProducts = [];
  onMount(() => {
    currentProducts = db.getItemValue("SC_PRODUCTS");
  });
  onDestroy(() => {
    subscribe;
  });
</script>

{#if currentProducts.length >= 1}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 ">
    {#each currentProducts as product, key}
      <Product
        productName={product.name}
        unitName={product.unitName}
        unitPrice={product.unitPrice}
        amtInStock={product.amount}
        id={product.id}
      />
    {/each}
  </div>
{:else}
  <h1
    class="text-primary text-opacity-20 font-extrabold text-3xl sm:text-4xl md:text-6xl"
  >
    No Products
  </h1>
{/if}

<style>
</style>
