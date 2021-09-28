<script>
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Toast from "./../../../_components/toast.svelte";
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
    }
  }

  metatags.title = "Products";
</script>

<AddProduct />
<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Products</h1>
<div
  class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-8 lg:gap-y-0"
>
  <div>
    <h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
      Measurable
    </h2>
    {#if isMeasurableProducts.length >= 1}
      <div
        class="grid grid-cols-1 md:grid-cols-2 mt-4 overflow-x-hidden w-full"
      >
        {#each isMeasurableProducts as product (product.id)}
          <div out:scale|local in:fade animate:flip={{ duration: 500 }}>
            <ProductCard
              productName={product.name}
              amtInStock={product.amtLeftForSale}
              unitPrice={product.unitPrice}
              unitName={product.unitName}
              id={product.id}
            />
          </div>
        {/each}
      </div>
    {:else}
      <h1
        class="text-primary text-opacity-20 font-extrabold text-3xl sm:text-4xl md:text-6xl"
        out:scale|local
      >
        No Products
      </h1>
    {/if}
  </div>
  <div>
    <h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
      Fixed
    </h2>

    {#if nonMeasurableProducts.length > 0}
      <div
        class="grid grid-cols-1 md:grid-cols-2 mt-4 overflow-x-hidden w-full"
      >
        {#each nonMeasurableProducts as product (product.id)}
          <div out:scale|local in:fade animate:flip={{ duration: 500 }}>
            <ProductCard
              productName={product.name}
              amtInStock={product.amtLeftForSale}
              unitPrice={product.unitPrice}
              unitName={product.unitName}
              id={product.id}
            />
          </div>
        {/each}
      </div>
    {:else}
      <h1
        class="text-primary text-opacity-20 font-extrabold text-3xl sm:text-4xl md:text-6xl"
        out:scale|local
      >
        No Products
      </h1>
    {/if}
  </div>
</div>
