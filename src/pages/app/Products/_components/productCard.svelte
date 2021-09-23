<script>
  import Icon from "./../../../../_components/icon.svelte";
  export let productName, amtInStock, unitPrice, unitName;
  let totalPrice = amtInStock * unitPrice;
</script>

<div class="bg-base-100 rounded-box mx-2 my-2 shadow-lg px-3 py-4 pb-8">
  <div class="flex justify-between">
    <div>
      <span class="text-sm text-base-content capitalize text-opacity-80"
        >item Name</span
      >
      <h2 class="capitalize text-primary font-bold text-lg">{productName}</h2>
    </div>
    <div>
      <span class="text-sm text-base-content capitalize text-opacity-80"
        >unit price</span
      >
      <h2 class="capitalize text-info font-bold text-md">
        {unitPrice}
        FCFA
      </h2>
    </div>
  </div>
  <div class="mt-3">
    <span class="text-sm text-base-content capitalize text-opacity-80 "
      >Amount in stock</span
    >
    <h2 class="capitalize  font-extrabold text-3xl text-info mb-2 mt-0">
      {amtInStock}
      <span class="text-base-content  text-xl">{unitName} </span>
    </h2>
    <div class="flex justify-between mt-8">
      <h2 class="capitalize font-bold text-base flex text-success">
        <span class="text-base-content mr-1"> total: </span>
        {totalPrice}FCFA
      </h2>

      <button class="btn btn-ghost btn-primary capitalize btn-sm ">
        <Icon name="dots-horizontal" /></button
      >
    </div>
  </div>
</div>

<style>
</style>
