<script>
  import accounts from "./../../../store/account.js";
  import { onMount, onDestroy } from "svelte";
  import MiscStats from "./_components/miscStats.svelte";
  import SalesChart from "./_components/salesChart.svelte";
  import TopProductCard from "./_components/topProductCard.svelte";
  import { fade } from "svelte/transition";
  import { metatags } from "@roxi/routify";
  import _ from "underscore";
  import db from "../../../scripts/dbManager";
  import numberFunctions from "../../../scripts/numberFunctions";
  import log from "@roxi/routify/lib/utils/log";

  let archive,
    totalProfit,
    total,
    totalCredit,
    totalProducts,
    pl,
    startDate,
    endDate;
  let activeTab = "days";

  function limitArray(arr, limit) {
    try {
      let finalArr = [];
      arr.forEach((e, index) => {
        if (index < limit) {
          finalArr.push(e);
        }
      });
      return finalArr;
    } catch (error) {
      return arr;
    }
  }
  function changeTab(e) {
    if (e.target.classList.value.split(" ").reverse().length == 6) {
      activeTab = e.target.classList.value.split(" ").reverse()[2];
    } else {
      activeTab = e.target.classList.value.split(" ").reverse()[1];
    }
    if (activeTab == "days") {
      archive = db.getItemValue("SC_ARCHIVE");
      archive.data = archive.data.reverse();
      archive.data = limitArray(archive.data, 5);
      archive.data = archive.data.reverse();
    } else if (activeTab == "weekly") {
      archive = db.getItemValue("SC_ARCHIVE");
      archive.data = archive.data.reverse();
      archive.data = limitArray(archive.data, 7);
      archive.data = archive.data.reverse();
    } else {
      archive = db.getItemValue("SC_ARCHIVE");
      archive.data = archive.data.reverse();
      archive.data = limitArray(archive.data, 30);
      archive.data = archive.data.reverse();
    }
  }

  onMount(() => {
    archive = db.getItemValue("SC_ARCHIVE");
    archive.data = archive.data.reverse();

    activeTab = "days";
    archive.data = limitArray(archive.data, 5);
    total = _.reduce(
      _.pluck(archive.data, "totalAmountFromSales"),
      function (memo, num) {
        return memo + num;
      },
      0
    );
    totalProducts = _.reduce(
      _.pluck(archive.data, "totalProductsSold"),
      function (memo, num) {
        return memo + num;
      },
      0
    );
    pl = _.pluck(archive.data, "totalProfitMade");
    totalProfit = _.reduce(
      _.pluck(archive.data, "totalProfitMade"),
      function (memo, num) {
        return memo + num;
      },
      0
    );
    totalCredit = _.reduce(
      _.pluck(archive.data, "totalCredit"),
      function (memo, num) {
        return memo + num;
      },
      0
    );
    startDate = [
      archive.data[0].date.split(",")[1].split(" ")[1],
      archive.data[0].date.split(",")[1].split(" ")[2],
    ].join(" ");
    endDate = [
      archive.data[archive.data.length - 1].date.split(",")[1].split(" ")[1],
      archive.data[archive.data.length - 1].date.split(",")[1].split(" ")[2],
    ].join(" ");
  });

  $: {
    if (archive) {
      total = _.reduce(
        _.pluck(archive.data, "totalAmountFromSales"),
        function (memo, num) {
          return memo + num;
        },
        0
      );
      totalProducts = _.reduce(
        _.pluck(archive.data, "totalProductsSold"),
        function (memo, num) {
          return memo + num;
        },
        0
      );
      totalCredit = _.reduce(
        _.pluck(archive.data, "totalCredit"),
        function (memo, num) {
          return memo + num;
        },
        0
      );
      pl = _.pluck(archive.data, "totalProfitMade");
      totalProfit = _.reduce(
        _.pluck(archive.data, "totalProfitMade"),
        function (memo, num) {
          return memo + num;
        },
        0
      );
      startDate = [
        archive.data[0].date.split(",")[1].split(" ")[1],
        archive.data[0].date.split(",")[1].split(" ")[2],
      ].join(" ");
      endDate = [
        archive.data[archive.data.length - 1].date.split(",")[1].split(" ")[1],
        archive.data[archive.data.length - 1].date.split(",")[1].split(" ")[2],
      ].join(" ");
    }
  }
  metatags.title = "Stats";
</script>

{#if archive}
  <div in:fade={{ delay: 500 }}>
    <h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">
      Statistics
    </h1>
    <div class="flex w-full items-center md:justify-center ">
      <div class="tabs tabs-boxed bg-base-100 shadow-inner p-2">
        <div
          class="tab capitalize font-bold days"
          class:tab-active={activeTab == "days"}
          on:click={changeTab}
        >
          5 days
        </div>
        <div
          class="tab capitalize font-bold weekly transition"
          class:tab-active={activeTab == "weekly"}
          on:click={changeTab}
        >
          weekly
        </div>
        <div
          class="tab capitalize font-bold monthly"
          class:tab-active={activeTab == "monthly"}
          on:click={changeTab}
        >
          monthly
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2
        class="text-base-content md:text-2xl text-xl font-bold text-opacity-80 capitalize mb-4"
      >
        account details <span
          class="ml-1 opacity-50 md:text-lg text-xs sm:text-base font-normal"
          >({startDate} - {endDate})</span
        >
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
        <div class="shadow stats">
          <div class="stat">
            <div class="stat-title capitalize  ">Total amount from sales</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(total)}
              <small>FCFA</small>
            </div>
          </div>
        </div>

        <div class="shadow stats">
          <div class="stat">
            <div class="stat-title capitalize  ">total products sold</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(totalProducts)}<small
                class="text-opacity-70 capitalize text-primary ml-1"
                >products</small
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 mt-12 grid-cols-1 ">
      <div>
        <h2
          class="text-base-content md:text-2xl text-lg font-bold   text-opacity-80 capitalize mb-4"
        >
          sales chart <span
            class="ml-1 opacity-50 md:text-lg text-xs sm:text-base font-normal"
            >({startDate} - {endDate})</span
          >
        </h2>
        <SalesChart  pl={archive}/>
      </div>
      <div>
        <h2
          class="text-base-content md:text-2xl text-lg font-bold   text-opacity-80 capitalize mb-4"
        >
          misc stats <span
            class="ml-1 opacity-50 md:text-lg text-xs sm:text-base font-normal"
            >({startDate} - {endDate})</span
          >
        </h2>
        <MiscStats {totalProfit} {totalCredit} pl={archive.data} />
      </div>
    </div>
    <h2
      class="text-base-content md:text-2xl text-lg font-bold  mt-12 text-opacity-80 capitalize"
    >
      Top products <span
        class="ml-1 opacity-50 md:text-lg text-xs sm:text-base font-normal"
        >({startDate} - {endDate})</span
      >
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
      <TopProductCard
        productName="bread"
        values={[260, 300, 180, 150, 300, 180, 150]}
        labels={["mon", "tues", "wed", "thurs", "fri", "sat", "sun"]}
        totalPrice="7900"
        totalUnits="790"
        unitPrice="100"
        unitName="pieces"
        chartType="bar"
        color="#e64980"
      />
      <TopProductCard
        productName="chicken"
        values={[20, 10, 18, 15, 30, 18, 40]}
        labels={["mon", "tues", "wed", "thurs", "fri", "sat", "sun"]}
        totalPrice="7900"
        totalUnits="790"
        unitPrice="100"
        unitName="chickens"
        chartType="bar"
        color="#c0ea80"
      />
      <TopProductCard
        productName="bread"
        values={[260, 300, 180, 150, 300, 180, 150]}
        labels={["mon", "tues", "wed", "thurs", "fri", "sat", "sun"]}
        totalPrice="7900"
        totalUnits="790"
        unitPrice="100"
        unitName="pieces"
        chartType="bar"
        color="#0cf9df"
      />
    </div>
  </div>
{/if}

<!--  -->
<style lang="scss">
  .tab {
    @media screen and (max-width: 295px) {
      font-size: 12px;
    }
  }
</style>
