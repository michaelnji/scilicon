<script>
  import Toast from "./toast.svelte";

  import { dismissToast, toasts } from "./../store/toast";
  import { fade } from "svelte/transition";
</script>

{#if $toasts}
  <section>
    {#each $toasts as toast (toast.id)}
      <div class="m-3" transition:fade={{ duration: 300 }}>
        <Toast
          type={toast.type}
          dismissible={toast.dismissible}
          on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
        >
      </div>
    {/each}
  </section>
{/if}

<style>
  section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    margin-right: 3rem;
    margin-top: 7rem;
    /* margin-bottom: 3rem; */
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }
</style>
