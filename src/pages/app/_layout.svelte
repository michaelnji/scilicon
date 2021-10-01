<!-- routify:options preload="proximity" -->
<script>
  import Notifications from "./../../_components/notifications.svelte";
  import Toasts from "./../../_components/Toasts.svelte";
  import TopNavbar from "../../_components/topNavbar.svelte";
  // import Navbar from "../../_components/navbar.svelte";
</script>

<div class="bg-base-200 text-base-content min-h-screen" data-theme="black">
  <Toasts />
  <Notifications />
  <header>
    <TopNavbar />
  </header>
  <main class="pt-24 bg-base-200 text-base-content">
    <div class=" px-4 md:px-6  bg-base-200 text-base-content pb-8">
      <slot />
    </div>
  </main>
  <!-- <footer><Navbar /></footer> -->
</div>
