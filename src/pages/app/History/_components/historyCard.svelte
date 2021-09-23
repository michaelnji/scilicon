<script>
  import Chart from "./../../../../_components/chart.svelte";
  import Icon from "./../../../../_components/icon.svelte";
  export let productName,
    values,
    totalPrice,
    grossPercentage,
    unitPrice,
    totalUnits,
    id,
    color,
    unitName;
  const data = {
    labels: ["week 1", "week 2", "week 3", "week 4"],
    datasets: [
      {
        name: "pieces of bread",
        type: "bar",
        values: values,
      },
    ],
  };
</script>

<div class="bg-base-100 rounded-box mx-2 my-2 shadow-lg px-6 py-4">
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
      {totalUnits}
      <span class="text-base-content  text-xl">{unitName} sold </span>
    </h2>
    <Chart
      {id}
      title={"sales for october"}
      {color}
      {data}
      type={"bar"}
      height={250}
    />
    <div class="flex justify-between mt-8">
      <div>
        <h2
          class="capitalize font-bold text-base flex text-base-content text-opacity-60"
        >
          <span class="text-base-content mr-1"> CP: </span>
          {totalPrice}FCFA
        </h2>
        <h2
          class="capitalize font-bold text-base flex text-base-content text-opacity-60"
        >
          <span class="text-base-content mr-1"> SP: </span>
          {totalPrice}FCFA
        </h2>
        <h2
          class="capitalize font-bold text-base flex text-base-content text-opacity-60"
        >
          <span class="text-base-content mr-1"> Gain: </span>
          {grossPercentage}%
        </h2>
      </div>
    </div>
  </div>
</div>

<style>
</style>
