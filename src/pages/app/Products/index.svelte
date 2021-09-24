<script>
  import AddProduct from "./../_components/addProduct.svelte";
  import ProductCard from "./_components/productCard.svelte";
  import { metatags } from "@roxi/routify";
  import { onDestroy, onMount } from "svelte";
  import products from "./../../../store/products.js";
  import db from "../../../../../avecas/src/scripts/dbManager";
  let currentProducts,
    totalProducts,
    grossGain,
    totalSales,
    isMeasurableProducts,
    nonMeasurableProducts,
    subscribe;
  currentProducts = [];
  isMeasurableProducts = [];
  nonMeasurableProducts = [];
  onMount(() => {
    products.update((value) => {
      return db.getItemValue("SC_PRODUCTS");
    });
    subscribe = products.subscribe((value) => {
      currentProducts = value;
    });
  });
  onDestroy(() => {
    subscribe;
  });
  $: {
    if (currentProducts) {
      isMeasurableProducts = [];
      nonMeasurableProducts = [];
      currentProducts.forEach((product) => {
        if (product.isMeasurable) {
          isMeasurableProducts.push(product);
        } else {
          nonMeasurableProducts.push(product);
        }
      });
      // console.log(isMeasurableProducts);
      // console.log(nonMeasurableProducts);
    }
  }
  metatags.title = "Products";
</script>

<AddProduct />
<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Products</h1>
<div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 lg:gap-x-8 lg:gap-y-0">
  <div>
    <h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
      Fixed
    </h2>
    {#if isMeasurableProducts.length >= 1}
      <div class="grid grid-cols-1 md:grid-cols-2 mt-4 ">
        {#each isMeasurableProducts as product, key}
          <ProductCard
            productName={product.name}
            amtInStock={product.amtLeftForSale}
            unitPrice={product.unitPrice}
            unitName={product.unitName}
            isSoldOut={product.isSoldOut}
            initialStock={product.initialStock}
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
  </div>
  <div>
    <h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
      Measure-ables
    </h2>

    {#if nonMeasurableProducts.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 mt-4 ">
        {#each nonMeasurableProducts as product, key}
          <ProductCard
            productName={product.name}
            amtInStock={product.amtLeftForSale}
            unitPrice={product.unitPrice}
            unitName={product.unitName}
            isSoldOut={product.isSoldOut}
            initialStock={product.initialStock}
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
  </div>
</div>
