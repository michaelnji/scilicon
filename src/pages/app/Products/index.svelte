<script>
  import AddProduct from "./../_components/addProduct.svelte";
  import ProductCard from "./_components/productCard.svelte";
  import { metatags } from "@roxi/routify";

  metatags.title = "Products";
</script>

<AddProduct />
<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Products</h1>
<div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 lg:gap-x-8 lg:gap-y-0">
  <div>
    <h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
      Fixed
    </h2>

    <div
      class="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-y-2 gap-x-0 lg:gap-x-2 lg:gap-y-2"
    >
      <ProductCard
        productName="Sardine"
        totalPrice="200"
        amtInStock="5"
        unitPrice="100"
        grossPercentage="10"
        unitName="spoons"
      />
      <ProductCard
        productName="bread"
        totalPrice="800"
        unitPrice="100"
        amtInStock="8"
        grossPercentage="80"
        unitName="pieces"
      />
      <ProductCard
        productName="butter"
        totalPrice="100"
        unitPrice="100"
        amtInStock="2"
        grossPercentage="30"
        unitName="spoons"
      />
      <ProductCard
        productName="chocolate"
        totalPrice="200"
        amtInStock="8"
        unitPrice="100"
        grossPercentage="80"
        unitName="spoons"
      />
    </div>
  </div>
  <div>
    <h2 class="text-base-content md:text-2xl text-xl font-bold text-opacity-80">
      Measure-ables
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 mt-4">
      <ProductCard
        productName="Sardine"
        totalPrice="200"
        amtInStock="5"
        unitPrice="100"
        grossPercentage="10"
        unitName="spoons"
      />
      <ProductCard
        productName="bread"
        totalPrice="800"
        unitPrice="100"
        amtInStock="8"
        grossPercentage="80"
        unitName="pieces"
      />
      <ProductCard
        productName="butter"
        totalPrice="100"
        unitPrice="100"
        amtInStock="2"
        grossPercentage="30"
        unitName="spoons"
      />
      <ProductCard
        productName="chocolate"
        totalPrice="200"
        amtInStock="8"
        unitPrice="100"
        grossPercentage="80"
        unitName="spoons"
      />
    </div>
  </div>
</div>
