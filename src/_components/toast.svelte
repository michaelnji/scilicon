<script>
  import Icon from "./icon.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let type = "info";
  export let dismissible = true;
</script>

<article
  role="alert"
  class="bg-base-100 p-4 rounded-box  shadow-lg min-w-max md:max-w-max flex items-center justify-between fixed left-1/2 bottom-8 transform -translate-x-1/2 capitalize text-xs z-50 font-bold sm:text-sm text-base-content"
>
  {#if type === "info"}
    <span class=" md:inline text-info"> <Icon name="question-mark" /></span>
  {:else if type === "warning" || type === "error"}
    <span class="hidden md:inline text-error"> <Icon name="warning" /></span>
  {:else}
    <span class="hidden md:inline text-success"> <Icon name="info" /></span>
  {/if}
  <span class="mx-3"> <slot /></span>
  {#if dismissible}
    <button on:click={() => dispatch("dismiss")}>
      <Icon name="x" />
    </button>
  {/if}
</article>

<style>
  article {
    z-index: 1000 !important;
  }
</style>
