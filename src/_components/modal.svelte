<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "./icon.svelte";
  export let isOpen, content, title, modalId;
  const dispatch = createEventDispatcher();
  function closeModal() {
    isOpen = false;
  }
  function triggerSuccessEvent() {
    dispatch("ModalSuccess", modalId);
    closeModal();
  }
  function triggerCancelEvent() {
    dispatch("ModalCancel", modalId);
    closeModal();
  }
</script>

{#if isOpen}
  <div id="my-modal" class="modal  modal-open" transition:fade>
    <div class="modal-box">
      <div class="flex items-center justify-between mb-2">
        {#if title}
          <h3 class="text-xl md:text-2xl font-bold text-primary capitalize">
            {title}
          </h3>
        {/if}
        <button
          class="btn btn-ghost btn-circle  btn-sm mb-4"
          class:ml-auto={!title}
          on:click|preventDefault={closeModal}><Icon name="x" /></button
        >
      </div>
      <p class="md:text-md mb-8">
        {content}
      </p>
      <div class="modal-action">
        <button
          class="btn btn-primary capitalize"
          on:click|preventDefault={triggerSuccessEvent}>accept</button
        >
        <button
          class="btn btn-ghost capitalize"
          on:click|preventDefault={triggerCancelEvent}>cancel</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
</style>
