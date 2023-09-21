<script>
  import { createEventDispatcher } from 'svelte';
  import EscapeListener from './EscapeListener.svelte';
  const dispatch = createEventDispatcher();

  let name = '';

  const addTodo = () => {
    dispatch('addTodo', name);
    name = '';
  };

  const onCancel = () => (name = '');
</script>

<EscapeListener {onCancel} />
<form on:submit|preventDefault={addTodo}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg"> Add new todo </label>
  </h2>
  <input
    bind:value={name}
    type="text"
    id="todo-0"
    autocomplete="off"
    class="input input__lg"
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">
    Add
  </button>
</form>
