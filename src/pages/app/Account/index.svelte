<script>
  import AccountTable from "./_components/accountTable.svelte";
  import { metatags } from "@roxi/routify";

  metatags.title = "Accounts";
</script>

<h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">Accounts</h1>

<div
  class=" z-0 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-0 gap-y-4 gap-x-0  mt-4"
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
