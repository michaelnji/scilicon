<script>
  import Chart from "./../../../../_components/chart.svelte";
  import nf from "../../../../scripts/numberFunctions";
  import { v4 as uuidv4 } from "uuid";
  import _ from "underscore";
  export let pl;
  let id = uuidv4();
  let data, products;
  products = _.pluck(pl, "products")[0];

  data = {
    labels: ["wk1", "wk2", "wk3", "wk4", "wk5"],
    datasets: [
      {
        name: `chicken `,
        type: "line",
        values: [10, 0, 60, 25, 13],
      },
    ],
  };
</script>

<div
  class="bg-base-100 rounded-box mx-2 my-2 shadow-lg px-6 py-4 pb-8 overflow-hidden"
>
  <h2 class="font-md text-base md:text-lg capitalize  mb-3 opacity-50">
    select a product to view its sales chart
  </h2>
  <div class="flex flex-wrap items-center  mb-4 mt-2">
    {#each products as product}
      <span
        class="text-primary capitalize py-2 px-4 rounded-full bg-primary bg-opacity-20 cursor-pointer transition hover:bg-opacity-100 hover:text-primary-content m-1.5"
        >{product.name}</span
      >
    {/each}
  </div>
  <Chart
    {id}
    title={""}
    color={["#40c057", "#fa5252", "#fd7e14"]}
    {data}
    type={"line"}
    height={300}
  />
</div>

<style>
</style>
