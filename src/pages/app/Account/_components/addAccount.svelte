<script>
  import Icon from "./../../../../_components/icon.svelte";
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import { fade, fly } from "svelte/transition";
  import timeFunctions from "../../../../scripts/timeFunctions";
  import accounts from "../../../../store/account";
  import dbManager from "../../../../scripts/dbManager";
  import { addToast } from "../../../../store/toast";
  import numberFunctions from "../../../../scripts/numberFunctions";
  let active, creditPrice, creditAmt, allProducts, creditName;
  creditPrice = 0;
  let isOpen = false;
  let errorOccurred = false;

  onMount(() => {
    allProducts = dbManager.getItemValue("SC_PRODUCTS");
  });
  // selects a product and sets its id, name and price to a variable to be used in the addCredit function
  function activate(id1, name, price) {
    active = id1;
    creditName = name;
    creditPrice = price;
  }
  // closes modal
  function closeModal() {
    isOpen = !isOpen;
  }

  function addCreditItem() {
    // on add credit
    // simple form validation
    if (creditName == undefined || creditAmt == undefined) {
      errorOccurred = true;
      setTimeout(() => {
        errorOccurred = false;
      }, 3500);
    } else {
      // localStorage values which need to be updated
      let creditAccount = dbManager.getItemValue("SC_CREDIT_ACCOUNT");
      let products, product;
      // all products
      products = dbManager.getItemValue("SC_PRODUCTS");
      // current product
      product = products.filter((e) => e.id === active)[0];
      let accountInfo = dbManager.getItemValue("SC_GENERAL_ACCOUNT");
      let archiveAccountInfo = dbManager.getItemValue("SC_ARCHIVE_ACCOUNT");
      // new credit item
      let item = {};
      // only allow to borrow an amount which is <= amount which has already being sold
      if (
        accountInfo.currentAccountBalance < creditAmt * creditPrice ||
        creditAmt >= product.amtLeftForSale
      ) {
        let message = ` amount not available`;
        let timeout = 2000;
        let type = "error";
        let dismissible = false;
        addToast({ message, type, dismissible, timeout });
      } else {
        // info for new credit item
        item.name = creditName ? creditName : "product";
        item.date = timeFunctions.todayShort();
        item.id = uuidv4();
        item.amount = creditAmt * creditPrice;

        // amount of borrowed products is deducted from amount of products left in that individual products account
        product.amtLeftForSale = product.amtLeftForSale - creditAmt;
        dbManager.setItemValue("SC_CREDIT_ACCOUNT", [...creditAccount, item]);
        // removing products borrowed from total product stock left for sale
        accountInfo.productsLeftInStock =
          accountInfo.productsLeftInStock - creditAmt;
        archiveAccountInfo.productsLeftInStock =
          archiveAccountInfo.productsLeftInStock - creditAmt;
        // used by stats page
        accountInfo.totalCredit =
          accountInfo.totalCredit + creditAmt * creditPrice;
        archiveAccountInfo.totalCredit =
          archiveAccountInfo.totalCredit + creditAmt * creditPrice;
        // updating all localStorage values
        products = products.filter((e) => e.id !== active);
        dbManager.setItemValue("SC_PRODUCTS", [...products, product]);
        dbManager.setItemValue("SC_GENERAL_ACCOUNT", accountInfo);
        dbManager.setItemValue("SC_ARCHIVE_ACCOUNT", archiveAccountInfo);
        accounts.update((value) => {
          return [];
        });
        let message = ` success`;
        let timeout = 2000;
        let type = "success";
        let dismissible = false;
        addToast({ message, type, dismissible, timeout });
        creditName = undefined;
        creditAmt = undefined;
        closeModal();
      }
    }
  }
  // clear all input values on close
  $: {
    if (isOpen == false) {
      creditName = undefined;
      creditAmt = undefined;
      active = null;
    }
  }
  function triggerCancelEvent() {
    //    oN Cancel
    closeModal();
  }
</script>

<button
  class="capitalize btn btn-primary fixed bottom-4 right-4  shadow-xl  btn-md z-20  flex item-center  rounded-box "
  on:click={closeModal}
  ><Icon name="plus" />
  <span class="hidden ml-3 lg:inline">Add item</span></button
>
{#if isOpen}
  <div
    class="w-screen px-2 pt-3 h-screen hero-overlay left-0 fixed top-0 overflow-scroll grid md:place-items-center cursor-d   place-items-end z-50 "
    transition:fade
  >
    <div
      class="p-4 md:px-6 bg-base-100 w-full md:max-w-sm lg:max-w-md shadow-2xl z-50 rounded-t-box md:rounded-box "
    >
      <!-- main content -->

      <div class="flex items-center justify-between">
        <h3 class="text-xl md:text-2xl font-bold text-primary capitalize my-4">
          new credit
        </h3>
        <button class="btn btn-ghost btn-sm" on:click={closeModal}
          ><Icon name="x" /></button
        >
      </div>
      <div>
        <form class="mb-8   grid grid-cols-1 gap-y-3  ">
          <div>
            {#if errorOccurred && creditName == undefined}
              <span
                class="label-text text-error text-opacity-80"
                in:fly={{ y: 100 }}>please choose a product</span
              >
            {:else}
              <span class="label-text text-opacity-80 capitalize"
                >choose a product</span
              >
            {/if}
            <div class="grid sm:grid-cols-2  mt-2 grid-cols-1 gap-2">
              {#each allProducts as product}
                <span
                  class="text-primary bg-primary bg-opacity-20 capitalize  p-2  flex justify-between items-center rounded-full  cursor-pointer transition duration-500 ring ring-transparent hover:bg-opacity-100 hover:text-primary-content backdrop-blur-sm"
                  class:ring-error={errorOccurred && creditName == undefined}
                  class:bg-opacity-100={active == product.id}
                  class:font-bold={active == product.id}
                  class:text-primary-content={active == product.id}
                  class:shadow-xl={active == product.id}
                  on:click={activate(
                    product.id,
                    product.name,
                    product.unitPrice
                  )}
                  >{product.name}
                  <span
                    class="badge badge-primary badge-sm transition duration-300 md:"
                    class:bg-neutral={active == product.id}
                    class:text-neutral-content={active == product.id}
                    >{numberFunctions.formatNum(product.amtLeftForSale)}</span
                  ></span
                >
              {/each}
            </div>
          </div>

          <div class="grid grid-cols-2">
            <div class="form-control">
              <label class="label" for="Amount">
                {#if errorOccurred && creditAmt == undefined}
                  <span
                    class="label-text text-error text-opacity-80"
                    in:fly={{ y: 100 }}>please fill this field</span
                  >
                {:else}
                  <span class="label-text text-opacity-80">Amount</span>
                {/if}
              </label>
              <input
                placeholder="00"
                name="Amount"
                class="input input-bordered"
                type="number"
                class:input-error={errorOccurred && creditAmt == undefined}
                bind:value={creditAmt}
              />
            </div>
            <span class="py-12 mx-4 text-xs sm:text-base"
              >x {numberFunctions.formatNum(creditPrice)}FCFA</span
            >
          </div>
        </form>
      </div>

      <div>
        <button
          class="btn btn-primary capitalize btn-sm mr-3 sm:btn-md"
          on:click|preventDefault={addCreditItem}
        >
          add Credit
        </button>

        <button
          class="btn btn-ghost capitalize btn-sm sm:btn-md"
          on:click|preventDefault={triggerCancelEvent}>cancel</button
        >
      </div>
    </div>
  </div>
{/if}

<style></style>
