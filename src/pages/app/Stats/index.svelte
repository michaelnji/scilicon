<script>
  import { fade } from "svelte/transition";
  import { metatags } from "@roxi/routify";

  metatags.title = "Stats";
</script>

<div in:fade={{ delay: 500 }}>
  <h1 class="text-base-content md:text-4xl text-2xl font-bold mb-10">
    Statistics
  </h1>
</div>

<style>
</style>
