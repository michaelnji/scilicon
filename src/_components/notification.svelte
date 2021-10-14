<script>
  import { fade, fly } from "svelte/transition";
  import Icon from "./icon.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let type = "info";
  export let dismissible = true;
  export let title = "information, add .com";
  export let message = "information, add .com";
</script>

<div
  class=" p-4 md:px-6 bg-base-200 min-w-11/12  md:min-w-md shadow-2xl z-50  rounded-box mx-auto  my-auto overflow-visible w-full px-3"
  in:fly={{ y: -500 }}
  out:fade
>
  <div class=" mb-2">
    {#if dismissible}
      <button
        class="btn-ghost btn btn-sm btn-circle flex items-center justify-center"
        on:click={() => dispatch("dismissNot")}
      >
        <Icon name="x" />
      </button>
    {/if}
  </div>
  <h3 class={"font-extrabold mr-4 text-lg lg:text-xl capitalize text-" + type}>
    {title}
  </h3>
  <div class="my-3">
    <p class=" leading-relaxed text-base-content text-opacity-75 sm:text-base">
      {@html message}
    </p>
  </div>
</div>

<style>
</style>
