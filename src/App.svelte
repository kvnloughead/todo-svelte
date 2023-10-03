<script lang="ts">
  import Todos from "./components/Todos.svelte";
  import { todos } from "./stores";
</script>

<Todos bind:todos={$todos} />
