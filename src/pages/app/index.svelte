<script>
  import products from "./../../store/products.js";
  import EmptyEvents from "./../../_components/EmptyEvents.svelte";
  import { fade } from "svelte/transition";
  import { metatags, goto } from "@roxi/routify";
  import db from "../../scripts/dbManager";
  import { onMount } from "svelte";
  // initializing app variables in localStorage
  let varNames = ["SC_PRODUCTS", "SC_ACCOUNT_MONTHS", "SC_ACCOUNTS_WEEK"];
  onMount(() => {
    let randTime = Math.ceil(Math.random() * 13000 + 1);
    randTime = randTime > 3500 ? randTime : 5500;
    varNames.forEach((v) => {
      db.getOrSetItem(v, []);
    });
    db.getOrSetItem("SC_THEME", "light");
    let generalAccount = {
      capital: 50000,
      currentAccountBalance: 0,
      totalProductsStock: 0,
      totalProductsSold: 0,
      totalProfitMade: 0,
      projectedProfit: 0,
      projectedSales: 0,
      productsLeftInStock: 0,
      totalAmountFromSales: 0,
      totalCredit: 0,
      totalExpense: 0,
    };
    db.getOrSetItem("SC_GENERAL_ACCOUNT", generalAccount);
    db.getOrSetItem("PI", 0);
    db.getOrSetItem("SC_ACCOUNT_ARCHIVE_DAY", []);
    db.getOrSetItem("SC_CREDIT_ACCOUNT", []);
    db.getOrSetItem("SC_ACCOUNT_ARCHIVE_WEEK", []);
    db.getOrSetItem("SC_ACCOUNT_ARCHIVE_MONTH", []);
    //  updating all stores
    products.update((value) => {
      return db.getItemValue("SC_PRODUCTS");
    });

    setTimeout(() => {
      $goto("./Overview");
    }, randTime);
  });
  metatags.title = "scilicon|basic BMS";
  metatags.description =
    "A simple yet effective Business Management System built specifically for my mom ";
</script>

<div
  in:fade
  out:fade={{ duration: 0.1 }}
  class="grid grid-cols-1 w-full mx-auto max-w-md"
>
  <EmptyEvents />
  <div class="mt-4 md:mt-2 w-full flex flex-col items-center">
    <div>
      <span class="text-base-content text-xl font-semibold text-opacity-60"
        >loading</span
      >
      <button class="btn  btn-lg loading mb-8 md:mb-33 btn-ghost" />
    </div>
    <h1
      class="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-primary font-cursive"
    >
      Scilicon
    </h1>
  </div>
</div>
