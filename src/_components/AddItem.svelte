<script>
  import Icon from "./icon.svelte";
</script>

<div
  class="dropdown dropdown-top  max-w-max fixed bottom-8 md:right-12 right-6 z-50"
>
  <button
    tabindex="1"
    class=" btn btn-primary btn-circle md:btn-lg  transform hover:rotate-45 active:rotate-45 rounded-full z-50"
    ><Icon name="plus" /></button
  >
  <ul
    tabindex="0"
    class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 min-w-max absolute right-8 top-3"
  >
    <li>
      <button class="btn btn-ghost pl-2 justify-start capitalize"
        ><span class="mr-4"><Icon name="flag" /></span>product</button
      >
    </li>
    <li>
      <button class="btn btn-ghost pl-2 justify-start capitalize"
        ><span class="mr-4"><Icon name="hashtag" /></span>credit item</button
      >
    </li>
    <li>
      <button class="btn btn-ghost pl-2 justify-start capitalize"
        ><span class="mr-4"><Icon name="arobar" /></span>expense item</button
      >
    </li>
  </ul>
</div>
