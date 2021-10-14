<script>
  import Chart from "./../../../../_components/chart.svelte";
  import nf from "../../../../scripts/numberFunctions";
  import { v4 as uuidv4 } from "uuid";
  export let productName,
    values,
    chartType,
    unitPrice,
    labels,
    totalUnits,
    color,
    unitName;
  let id = uuidv4();
  const data = {
    labels: labels,
    datasets: [
      {
        name: `${unitName} sold`,
        type: chartType,
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
      title={"sales for today"}
      {color}
      {data}
      type={chartType}
      height={250}
    />
  </div>
</div>

<style>
</style>
