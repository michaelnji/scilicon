<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Icon from "./icon.svelte";
  export let content, type, duration, isOpen;

  onMount(() => {
    setTimeout(() => {
      isOpen = !isOpen;
    }, duration * 1000);
  });
</script>

{#if isOpen}
  <div
    in:fly={{ y: 500 }}
    out:fade
    class={"p-4 rounded-box bg-opacity-20 shadow-lg min-w-max md:max-w-max flex items-center justify-around fixed  bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold sm:text-sm text-" +
      type +
      " bg-" +
      type +
      " shadow-" +
      type}
  >
    <span class="hidden md:inline"> <Icon name="bell" /></span>
    <span class="ml-3"> {content}</span>
  </div>
{/if}

<style>
</style>
