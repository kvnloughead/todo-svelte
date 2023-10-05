<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { focusOnInit, selectOnFocus } from "../actions.js";
  const dispatch = createEventDispatcher();

  export let nameEl: HTMLElement;

  let name = "";

  const addTodo = () => {
    dispatch("addTodo", name);
    name = "";
    nameEl.focus();
  };
</script>

<form on:submit|preventDefault={addTodo}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg"> Add new todo </label>
  </h2>
  <input
    bind:value={name}
    bind:this={nameEl}
    use:selectOnFocus
    use:focusOnInit
    type="text"
    id="todo-0"
    autocomplete="off"
    class="input input__lg"
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">
    Add
  </button>
</form>
