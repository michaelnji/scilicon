<script>
  import accounts from "./../../../store/account.js";
  import ChangeCapital from "./_components/changeCapital.svelte";
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import AddAccount from "./_components/addAccount.svelte";
  import Icon from "./../../../_components/icon.svelte";
  import AccountTable from "./_components/accountTable.svelte";
  import { metatags } from "@roxi/routify";
  import dbManager from "../../../scripts/dbManager";
  import numberFunctions from "../../../scripts/numberFunctions.js";
  metatags.title = "Accounts";
  let accountInfo, subscribe, a;
  onMount(() => {
    accountInfo = dbManager.getItemValue("SC_GENERAL_ACCOUNT");
    subscribe = accounts.subscribe((value) => {
      a = value;
    });
  });
  onDestroy(() => {
    subscribe;
  });

  $: {
    if (a) {
      accountInfo = dbManager.getItemValue("SC_GENERAL_ACCOUNT");
    }
  }
</script>

<div in:fade={{ delay: 300 }}>
  <AddAccount />
  <h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">
    Accounts
  </h1>

  <div class="mb-16">
    <div class="flex justify-between items-center mb-8">
      <h2
        class="text-base-content md:text-2xl text-xl font-bold text-opacity-80 "
      >
        Account Details
      </h2>
      <button class="btn btn-accent  capitalize rounded-box"
        ><Icon name="database" />
        <span class="ml-3 hidden md:inline">create Archive</span></button
      >
    </div>
    {#if accountInfo}
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-6  gap-y-4 gap-x-0"
      >
        <div class="shadow stats">
          <div class="stat">
            <div class="stat-title">Current Capital</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(accountInfo.capital)}
              <small>FCFA</small>
            </div>
            <div class="stat-actions">
              <ChangeCapital />
            </div>
          </div>
        </div>
        <div class="shadow stats">
          <div class="stat">
            <div class="stat-title">Current Balance</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(accountInfo.currentAccountBalance)}
              <small>FCFA</small>
            </div>
          </div>
        </div>
        <div class="shadow stats">
          <div class="stat">
            <div class="stat-title">Current Profit</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(accountInfo.totalProfitMade)}
              <small>FCFA</small>
            </div>
          </div>
        </div>
        <div class="shadow stats">
          <div class="stat">
            <div class="stat-title">Total Products Sold</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(accountInfo.totalProductsSold)}
              <small>units</small>
            </div>
          </div>
        </div>
        <div class="shadow stats">
          <div class="stat">
            <div class="stat-title">Total Sales Made</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(accountInfo.totalAmountFromSales)}
              <small>FCFA</small>
            </div>

            <div class="stat-actions">
              <a
                href="/app/Stats"
                class="flex items-center text-accent btn-link"
                ><span class="mr-1">learn more</span><Icon
                  name="arrow-right-sm"
                /></a
              >
            </div>
          </div>
        </div>
        <div class="shadow stats ">
          <div class="stat bg-base-100">
            <div class="stat-title">Current Product Stock</div>
            <div class="stat-value text-xl md:text-2xl">
              {numberFunctions.formatNum(accountInfo.productsLeftInStock)}
            </div>
            <div class="stat-actions">
              <a
                href="/app/Products"
                class="flex items-center text-accent btn-link"
                ><span class="mr-1">see all products</span><Icon
                  name="arrow-right-sm"
                /></a
              >
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div class="  grid grid-cols-1 mt-4 lg:w-10/12">
    <div>
      <h2
        class="text-base-content md:text-2xl text-xl font-bold text-opacity-80 mb-4"
      >
        Credit Account
      </h2>
      <AccountTable source={"SC_CREDIT_ACCOUNT"} />
    </div>
  </div>
</div>
