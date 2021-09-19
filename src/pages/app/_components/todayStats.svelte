<script>
  import Icon from "./../../../_components/icon.svelte";
</script>

<div class=" grid-flow-row lg:grid-flow-col md:w-full shadow stats bg-base-100">
  <div class="stat  border-r border-gray-700">
    <div class="stat-figure text-secondary">
      <Icon name="globe" />
    </div>
    <div class="stat-title capitalize">total sales</div>
    <div class="stat-value">310</div>
    <div class="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  <div class="stat border-r border-l">
    <div class="stat-figure text-secondary">
      <Icon name="smile" config="h-6 w-6" />
    </div>
    <div class="stat-title capitalize">Gross gain</div>
    <div class="stat-value">40%</div>
    <div class="stat-desc text-success">↗︎ 30 (22%)</div>
  </div>
  <div class="stat  border-r">
    <div class="stat-figure text-secondary">
      <Icon name="flag" />
    </div>
    <div class="stat-title capitalize">total products</div>
    <div class="stat-value">10</div>
    <div class="stat-desc text-error">↘︎ 17 (14%)</div>
  </div>
</div>

<style>
</style>
