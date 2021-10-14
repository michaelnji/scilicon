<script>
  import Notification from "./notification.svelte";

  import { dismissNotification, notifications } from "./../store/notifications";
  import { flip } from "svelte/animate";
</script>

<div>
  {#if $notifications}
    <section>
      {#each $notifications as notification (notification.id)}
        <div
          class="mx-12 my-4 notification z-50"
          animate:flip={{ duration: 500 }}
        >
          <Notification
            title={notification.title}
            type={notification.type}
            message={notification.message}
            dismissible={notification.dismissible}
            on:dismissNot={() => dismissNotification(notification.id)}
          />
        </div>
      {/each}
    </section>
  {/if}
</div>

<style>
  section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    display: flex;
    margin-right: 3rem;
    margin-top: 4rem;
    /* margin-bottom: 3rem; */
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
  }
  .notification {
    z-index: 1000 !important;
  }
</style>
