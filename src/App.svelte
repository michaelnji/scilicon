<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<Router {routes} />

<style global lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .btn-ghost {
    &:hover {
      @apply text-primary bg-primary bg-opacity-20;
    }
  }
</style>
