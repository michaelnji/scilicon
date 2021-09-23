<script>
  import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
  import { onMount } from "svelte";
  export let id, data, type, title, color, height;
  onMount(() => {
    const chart = new Chart(`#chart-${id}`, {
      title: title,
      data: data,
      type: type, // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: height ? height : 250,
      colors: [color],
    });
  });
</script>

<div id={`chart-${id}`} />

<style>
</style>
