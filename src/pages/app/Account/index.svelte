<script>
  import Icon from "./../../../_components/icon.svelte";
  import AccountTable from "./_components/accountTable.svelte";
  import { metatags } from "@roxi/routify";

  metatags.title = "Accounts";
</script>

<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Accounts</h1>

<div class="mb-16">
  <h2
    class="text-base-content md:text-2xl text-xl font-bold text-opacity-80 mb-4"
  >
    Current Account Details
  </h2>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-6  gap-y-4 gap-x-0"
  >
    <div class="shadow stats">
      <div class="stat">
        <div class="stat-title">Current Capital</div>
        <div class="stat-value text-xl md:text-2xl">
          8,400 <small>FCFA</small>
        </div>
        <div class="stat-actions">
          <button class="btn btn-accent btn-sm capitalize">change</button>
        </div>
      </div>
    </div>
    <div class="shadow stats">
      <div class="stat">
        <div class="stat-title">Current Profit</div>
        <div class="stat-value text-xl md:text-2xl">
          8,400 <small>FCFA (80% to goal)</small>
        </div>
      </div>
    </div>
    <div class="shadow stats">
      <div class="stat">
        <div class="stat-title">Total Sales Made</div>
        <div class="stat-value text-xl md:text-2xl">
          400.00 <small>FCFA</small>
        </div>
        <div class="stat-desc mt-2">10 Feb - 18 Mar</div>
        <div class="stat-actions">
          <a href="/app/Stats" class="flex items-center text-accent btn-link"
            ><span class="mr-2">learn more</span><Icon
              name="arrow-right-sm"
            /></a
          >
        </div>
      </div>
    </div>
    <div class="shadow stats">
      <div class="stat">
        <div class="stat-title">Current Product Stock</div>
        <div class="stat-value text-xl md:text-2xl">400</div>
        <div class="stat-actions">
          <a href="/app/Products" class="flex items-center text-accent btn-link"
            ><span class="mr-2">see all products</span><Icon
              name="arrow-right-sm"
            /></a
          >
        </div>
      </div>
    </div>
  </div>
</div>
<div
  class="  grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-0 gap-y-4 gap-x-0  mt-4"
>
  <div>
    <h2
      class="text-base-content md:text-2xl text-xl font-bold text-opacity-80 mb-4"
    >
      Credit Account
    </h2>
    <AccountTable />
  </div>

  <div>
    <h2
      class="text-base-content md:text-2xl text-xl font-bold text-opacity-80 mb-4"
    >
      Expense Account
    </h2>
    <AccountTable />
  </div>
</div>
<!-- <h2
  class="text-base-content md:text-2xl text-xl font-bold  mt-8 text-opacity-80 capitalize"
>
  statistics
</h2>

<div class="grid grid-cols-1  lg:grid-cols-2 mt-4">
  <TodayStats />
</div> -->
