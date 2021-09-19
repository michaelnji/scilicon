<script>
  import { isActive, url } from "@roxi/routify";
  import { fly } from "svelte/transition";

  import Icon from "./icon.svelte";
  import Logo from "./logo.svelte";
  // js code for sidebar
  let sidebarIsActive = false;
  const activateHandler = () => {
    sidebarIsActive = !sidebarIsActive;
  };
</script>

{#if sidebarIsActive}
  <div class=" min-w-screen absolute min-h-screen z-50 overflow-hidden">
    <div
      class="sidebar fixed h-screen z-50  bg-base-100 text-base-content  top-0 left-0 rounded-tr-box rounded-br-box shadow-lg flex flex-col items-start justify-start py-4 lg:w-4/12 w-11/12 sm:w-6/12 overflow-x-hidden"
      in:fly={{ x: -500, duration: 550 }}
      out:fly={{ x: -500, duration: 1000 }}
    >
      <header
        class=" flex justify-between items-center pr-2 w-full bg-base-100"
      >
        <Logo />
        <button
          class="btn btn-ghost hover:bg-primary hover:bg-opacity-20 hover:text-primary"
          on:click={activateHandler}><Icon name="x" /></button
        >
      </header>
      <div class="pt-4 overflow-x-hidden ">
        <div class=" pb-2 pr-4 ">
          <a href="/app/Overview" on:click={activateHandler}>
            <div
              class="w-full flex pl-6 pr-28  py-4 my-1 rounded-tr-full rounded-br-full hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-300 ease-out"
              class:active={$isActive("/app/Overview")}
            >
              <Icon name="home" config="mr-8" /><b class="ml-8">Overview</b>
            </div>
          </a>
          <a href="/app/Account" on:click={activateHandler}>
            <div
              class="w-full flex pl-6 pr-28  py-4 my-1 rounded-tr-full rounded-br-full hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-300 ease-out"
              class:active={$isActive("/app/Account")}
            >
              <Icon name="user" config="mr-8" /><b class="ml-8">Account</b>
            </div>
          </a>
          <a href="/app/Products" on:click={activateHandler}>
            <div
              class="w-full flex pl-6 pr-28  py-4 my-1 rounded-tr-full rounded-br-full hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-300 ease-out"
              class:active={$isActive("/app/Products")}
            >
              <Icon name="bookmark" config="mr-8" /><b class="ml-8">Products</b>
            </div>
          </a>
          <a href="/app/History" on:click={activateHandler}>
            <div
              class="w-full flex pl-6 pr-28  py-4 my-1 rounded-tr-full rounded-br-full hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-300 ease-out"
              class:active={$isActive("/app/History")}
            >
              <Icon name="book-open" config="mr-8" /><b class="ml-8">History</b>
            </div>
          </a>
          <a href="/app/Stats" on:click={activateHandler}>
            <div
              class="w-full flex pl-6 pr-28  py-4 my-1 rounded-tr-full rounded-br-full hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-300 ease-out"
              class:active={$isActive("/app/Stats")}
            >
              <Icon name="grid-view" config="mr-8" /><b class="ml-8">Stats</b>
            </div>
          </a>
        </div>
        <div class="w-full border-b opacity-20" />
        <div class="bottom pr-4">
          <a href="/app/FAQ" on:click={activateHandler}>
            <div
              class="w-full flex pl-6 pr-28  py-4 my-1 rounded-tr-full rounded-br-full hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-300 ease-out"
              class:active={$isActive("/app/FAQ")}
            >
              <Icon name="question-mark" config="mr-8" /><b class="ml-8">FAQ</b>
            </div>
          </a>
          <a href="/app/Settings" on:click={activateHandler}>
            <div
              class="w-full flex pl-6 pr-28  py-4 my-1 rounded-tr-full rounded-br-full hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-300 ease-out"
              class:active={$isActive("/app/Settings")}
            >
              <Icon name="cog" config="mr-8" /><b class="ml-8">Settings</b>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}
<button class="btn btn-ghost" on:click={activateHandler}>
  <Icon name="menu" />
</button>

<style>
  /* styles for sidebar */
  .active {
    @apply bg-opacity-10 bg-primary text-primary mr-4 rounded-br-full rounded-tr-full;
  }
  .bottom {
    margin-top: 2rem !important;
  }
</style>
