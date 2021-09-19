<script>
  import Icon from "./../../../_components/icon.svelte";
  export let productName, totalPrice, totalUnits, grossPercentage, unitName;
</script>

<div class="bg-base-100 rounded-box mx-2 my-2 shadow-lg px-3 py-4">
  <div class="flex justify-between">
    <div>
      <span class="text-xs text-base-content capitalize text-opacity-50"
        >item name</span
      >
      <h2 class="capitalize text-primary font-bold text-lg">{productName}</h2>
    </div>
    <div>
      <span class="text-xs text-base-content capitalize text-opacity-50"
        >units sold</span
      >
      <h2 class="capitalize text-info font-bold text-md">
        +{totalUnits}
        {unitName}
      </h2>
    </div>
  </div>
  <div>
    <h2 class="capitalize  font-extrabold text-3xl text-info my-2">
      +{totalPrice}
      <span class="text-base-content uppercase text-xl">fcfa</span>
    </h2>
    <div class="flex justify-between">
      <h2 class="capitalize font-bold text-base flex text-success">
        +{grossPercentage}% gain
      </h2>
      <button class="btn btn-outline btn-primary capitalize btn-sm ">
        <Icon name="plus" /><span class="ml-2 hidden md:inline">add unit</span
        ></button
      >
    </div>
  </div>
</div>

<style>
</style>
