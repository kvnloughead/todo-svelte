<script>
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  import EscapeListener from './EscapeListener.svelte';

  export let autofocus = false;
  export let nameEl;

  let name = '';

  const addTodo = () => {
    dispatch('addTodo', name);
    name = '';
    nameEl.focus();
  };

  const onCancel = () => {
    nameEl.focus();
    name = '';
  };

  function selectOnFocus(node) {
    if (node && typeof node.select === 'function') {
      const onFocus = (e) => node.select();
      node.addEventListener('focus', onFocus);
      return {
        destroy: () => {
          node.removeEventListener('focus', onFocus);
        },
      };
    }
  }

  onMount(() => {
    if (autofocus) nameEl.focus();
  });
</script>

<EscapeListener {onCancel} />
<form on:submit|preventDefault={addTodo}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg"> Add new todo </label>
  </h2>
  <input
    bind:value={name}
    bind:this={nameEl}
    use:selectOnFocus
    type="text"
    id="todo-0"
    autocomplete="off"
    class="input input__lg"
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">
    Add
  </button>
</form>
