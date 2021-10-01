<script>
  import { fade } from "svelte/transition";
  import Icon from "./../../../_components/icon.svelte";
  import HistoryCard from "./_components/historyCard.svelte";
  import HistoryAccount from "./_components/historyAccount.svelte";
  import { metatags } from "@roxi/routify";
  HistoryCard;
  metatags.title = "History";
</script>

<div in:fade={{ delay: 300 }}>
  <h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">
    History
  </h1>
  <h2
    class="md:text-2xl text-xl font-extrabold text-opacity-80 text-primary flex items-center"
  >
    October <button class="btn btn-ghost ml-2"
      ><Icon name="arrow-right-sm" /></button
    >
  </h2>
  <h2
    class="text-base-content md:text-xl text-lg font-bold  mt-8 text-opacity-80 capitalize"
  >
    Account analysis
  </h2>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 mt-4 mb-12 gap-y-8 lg:gap-x-8 lg:gap-y-0"
  >
    <HistoryAccount />
  </div>
  <h2
    class="text-base-content md:text-xl text-lg font-bold  mt-8 text-opacity-80 capitalize"
  >
    Top 3 products
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
    <HistoryCard
      productName="bread"
      values={[260, 300, 180, 150]}
      totalPrice="7900"
      totalUnits="790"
      unitPrice="100"
      grossPercentage="10"
      unitName="pieces"
      id="sdvi"
      color="#ff922b"
    />
    <HistoryCard
      productName="tomatoes"
      values={[10, 30, 80, 50]}
      totalPrice="17000"
      totalUnits="170"
      id="rhjt"
      unitPrice="100"
      grossPercentage="140"
      color="#2094f3"
      unitName="places"
    />
    <HistoryCard
      productName="sardine"
      values={[3, 2, 8, 1]}
      totalPrice="2000"
      totalUnits="14"
      color="#743ee2"
      id="fa"
      unitPrice="50"
      grossPercentage="70"
      unitName="spoons"
    />
  </div>
</div>
