<script>
  import Notification from "./Notification.svelte";

  import { dismissNotification, notifications } from "./../store/notifications";
  import { flip } from "svelte/animate";
</script>

<div>
  {#if $notifications}
    <section>
      {#each $notifications as notification (notification.id)}
        <div class="m-3" animate:flip={{ duration: 500 }}>
          <Notification
            title={notification.title}
            type={notification.type}
            dismissible={notification.dismissible}
            on:dismissNot={() => dismissNotification(notification.id)}
            >{notification.message}</Notification
          >
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
</style>
