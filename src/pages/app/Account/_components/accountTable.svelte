<script>
  import Icon from "./../../../../_components/icon.svelte";
</script>

<div class=" max-w-full  overflow-x-auto ">
  <table class="table w-full table-zebra">
    <thead>
      <tr>
        <td class="text-primary font-bold">Item</td>
        <td class="text-primary font-bold">Amt</td>
        <td class="text-primary font-bold">Date</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class=" text-xs sm:text-base flex items-center"
          >bread <button class="btn btn-ghost btn-sm ml-4"
            ><Icon name="check" /></button
          ></td
        >
        <td class="text-xs sm:text-base">300frs</td>
        <td class="text-xs sm:text-base">09/10/21</td>
      </tr>
      <tr>
        <td class=" text-xs sm:text-base">bread</td>
        <td class="text-xs sm:text-base">300frs</td>
        <td class="text-xs sm:text-base">09/10/21</td>
      </tr>
      <tr>
        <td class=" text-xs sm:text-base">sachet Tomato</td>
        <td class="text-xs sm:text-base">300frs</td>
        <td class="text-xs sm:text-base">09/10/21</td>
      </tr>
      <tr>
        <td class=" text-xs sm:text-base">Sardine</td>
        <td class="text-xs sm:text-base">300frs</td>
        <td class="text-xs sm:text-base">09/10/21</td>
      </tr>
      <tr>
        <td class=" text-xs sm:text-base">Chocolate</td>
        <td class="text-xs sm:text-base">300frs</td>
        <td class="text-xs sm:text-base">09/10/21</td>
      </tr>
      <tr />
    </tbody>

    <tr>
      <td class=" text-xs sm:text-base font-extrabold">TOTAL</td>
      <td class="text-xs sm:text-base" />
      <td class="text-sm sm:text-xl text-primary font-extrabold">2.000fcfa</td>
    </tr>
  </table>
</div>

<style>
</style>
