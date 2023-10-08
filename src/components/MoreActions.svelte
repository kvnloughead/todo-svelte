<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  const dispatch = createEventDispatcher();

  import type { TodoType } from "../types/todo.type";

  export let todos: TodoType[];
  let checkAllBtnEl: HTMLButtonElement;

  $: allCompleted = todos.filter((t) => t.completed).length === todos.length;
  $: noneCompleted = todos.filter((t) => t.completed).length === 0;

  function checkAll() {
    dispatch("checkAll", true);
  }

  async function unCheckAll() {
    dispatch("checkAll", false);
    await tick();
    checkAllBtnEl.focus();
  }

  function removeCompleted() {
    dispatch("removeCompleted");
  }
</script>

<ul class="btn-group">
  <li>
    <button
      type="button"
      disabled={todos.length === 0 || allCompleted}
      class="btn btn__primary"
      bind:this={checkAllBtnEl}
      on:click={checkAll}>Check All</button
    >
  </li>
  <li>
    <button
      type="button"
      disabled={todos.length === 0 || noneCompleted}
      class="btn btn__primary"
      on:click={unCheckAll}>Uncheck All</button
    >
  </li>
  <li>
    <button
      type="button"
      disabled={noneCompleted}
      class="btn btn__primary"
      on:click={removeCompleted}>Remove completed</button
    >
  </li>
</ul>
