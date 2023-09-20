<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let todos;

  $: allCompleted = todos.filter((t) => t.completed).length === todos.length;
  $: noneCompleted = todos.filter((t) => t.completed).length === 0;

  function checkAll() {
    dispatch('checkAll', true);
  }
  function unCheckAll() {
    dispatch('checkAll', false);
  }
  function removeCompleted() {
    dispatch('removeCompleted');
  }
</script>

<div class="btn-group">
  <button
    type="button"
    disabled={todos.length === 0 || allCompleted}
    class="btn btn__primary"
    on:click={checkAll}>Check All</button
  >
  <button
    type="button"
    disabled={todos.length === 0 || noneCompleted}
    class="btn btn__primary"
    on:click={unCheckAll}>Uncheck All</button
  >
  <button
    type="button"
    disabled={noneCompleted}
    class="btn btn__primary"
    on:click={removeCompleted}>Remove completed</button
  >
</div>
