<script>
  import Date from "./date.svelte";
  import Icon from "./icon.svelte";
  import Sidebar from "./sidebar.svelte";
</script>

<div
  class="flex navbar justify-between items-center w-full fixed sm:py-4 px-4 py-2  z-10 bg-base-100 top-0 left-0 right-0 text-base-content rounded-b-box "
>
  <Sidebar />
  <div class="flex md:fixed md:right-5 md:top-2">
    <div class="mr-2 md:mr-8"><Date /></div>
    <div class="dropdown dropdown-end">
      <div tabindex="0" class="m-1 btn btn-ghost">
        <span style="transform: rotate(90deg);"
          ><Icon name="dots-horizontal" /></span
        >
      </div>
      <ul
        tabindex="0"
        class="p-2 shadow-lg menu dropdown-content bg-base-100 rounded-box w-52 min-w-max"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  </div>
</div>
