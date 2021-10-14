<script>
  import Chart from "./../../../../_components/chart.svelte";
  import nf from "../../../../scripts/numberFunctions";
  import { v4 as uuidv4 } from "uuid";
  import db from "../../../../scripts/dbManager";
  import numberFunctions from "../../../../scripts/numberFunctions";
  export let totalProfit, totalCredit, pl;
  let id = uuidv4();

  let info = [];
  let data, labels;
  labels = [];
  pl.forEach((e, i) => {
    labels.push(e.date.split(",")[0]);
    info.push(e.totalAmountFromSales);
  });
  $: {
    console.log(pl);
    if (pl) {
      labels = [];
      info = [];
      pl.forEach((e, i) => {
        labels.push(e.date.split(",")[0]);
        info.push(e.totalAmountFromSales);
      });
    }
    data = {
      labels: labels,
      datasets: [
        {
          name: ``,
          type: "line",
          values: info,
        },
      ],
    };
  }
  data = {
    labels: labels,
    datasets: [
      {
        name: ``,
        type: "line",
        values: info,
      },
    ],
  };
</script>

<div
  class="bg-base-100 rounded-box mx-2 my-2 shadow-lg px-6 py-4 pb-8 overflow-hidden grid md:grid-cols-2 gap-y-3 grid-cols-1"
>
  <div>
    <h2 class="font-bold text-base md:text-lg capitalize  mb-1 opacity-50">
      sales made
    </h2>

    <Chart {id} title={""} color={"#40c057"} {data} type={"bar"} height={200} />
  </div>
  <div>
    <h2 class="font-bold text-base md:text-lg capitalize  mb-4 opacity-50">
      other stats
    </h2>
    <div class="grid grid-cols-1 gap-y-4">
      <div class="flex items-center justify-start p-2 bg-base-200 rounded-md">
        <h2
          class="font-semibold text-base md:text-lg capitalize  opacity-70 mr-3"
        >
          total profit
        </h2>
        <span class="text-primary font-bold text-base md:text-lg"
          >{numberFunctions.formatNum(totalProfit)}
          <span class="text-base-content">Fcfa</span></span
        >
      </div>
      <div class="flex items-center justify-start p-2 bg-base-200 rounded-md">
        <h2
          class="font-semibold text-base md:text-lg capitalize  opacity-70 mr-3"
        >
          New products
        </h2>
        <span class="text-primary font-bold text-base md:text-lg">+100</span>
      </div>
      <div class="flex items-center justify-start p-2 bg-base-200 rounded-md">
        <h2
          class="font-semibold text-base md:text-lg capitalize  opacity-70 mr-3"
        >
          credit given
        </h2>
        <span class="text-primary font-bold text-base md:text-lg"
          >{numberFunctions.formatNum(totalCredit)}<span
            class="text-base-content ml-1"
          >
            Fcfa</span
          ></span
        >
      </div>
    </div>
  </div>
</div>

<style>
</style>
