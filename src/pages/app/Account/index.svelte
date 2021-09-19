<script>
  import AccountTable from "./_components/accountTable.svelte";
</script>

<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Accounts</h1>

<div class=" z-0 grid grid-cols-1 lg:grid-cols-2  mt-4">
  <div class="mb-6">
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
