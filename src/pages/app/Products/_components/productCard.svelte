<script>
  import Icon from "./../../../../_components/icon.svelte";
  export let productName,
    amtSold,
    totalPrice,
    grossPercentage,
    unitPrice,
    unitName;
</script>

<div class="bg-base-100 rounded-box mx-2 my-2 shadow-lg px-3 py-4">
  <div class="flex justify-between">
    <div>
      <span class="text-xs text-base-content capitalize text-opacity-50"
        >item Name</span
      >
      <h2 class="capitalize text-primary font-bold text-lg">{productName}</h2>
    </div>
    <div>
      <span class="text-xs text-base-content capitalize text-opacity-50"
        >units price</span
      >
      <h2 class="capitalize text-info font-bold text-md">
        {unitPrice}
        FCFA
      </h2>
    </div>
  </div>
  <div>
    <h2 class="capitalize  font-extrabold text-3xl text-info my-2">
      {amtSold}
      <span class="text-base-content  text-xl"
        >{unitName} sold
        <span class="text-sm">({grossPercentage}% gain)</span></span
      >
    </h2>
    <div class="flex justify-between mt-8">
      <h2 class="capitalize font-bold text-base flex text-success">
        <span class="text-base-content mr-1"> total: </span>
        {totalPrice}FCFA
      </h2>
      <button class="btn btn-outline btn-primary capitalize btn-sm ">
        <Icon name="bar-chart" /><span class="ml-2 hidden md:inline">Stats</span
        ></button
      >
    </div>
  </div>
</div>

<style>
</style>
