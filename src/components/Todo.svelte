<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import type { TodoType } from "../types/todo.type";
  import EscapeListener from "./EscapeListener.svelte";
  import { focusOnInit, selectOnFocus } from "../actions";

  export let todo: TodoType;
  let editing = false;
  let name = todo.name;
  let editBtnPressed = false;

  function focusEditBtn(node: HTMLElement) {
    editBtnPressed && node.focus();
  }

  function update(updatedTodo: Partial<TodoType>) {
    todo = { ...todo, ...updatedTodo };
    dispatch("update", todo);
  }

  function onCancel() {
    name = todo.name;
    editing = false;
  }

  function onSave() {
    update({ name });
    editing = false;
  }

  function onRemove() {
    dispatch("remove", todo);
  }

  function onEdit() {
    editBtnPressed = true;
    editing = true;
  }

  function onToggle() {
    update({ completed: !todo.completed });
  }
</script>

<div class="stack-small">
  {#if editing}
    <EscapeListener {onCancel} />
    <form on:submit|preventDefault={onSave} class="stack-small">
      <div class="form-group">
        <label for="todo-{todo.id}" class="todo-label"
          >New name for '{todo.name}'</label
        >
        <input
          bind:value={name}
          use:selectOnFocus
          use:focusOnInit
          type="text"
          id="todo-{todo.id}"
          autoComplete="off"
          class="todo-text"
        />
      </div>
      <ul class="btn-group">
        <li>
          <button class="btn todo-cancel" on:click={onCancel} type="button">
            Cancel<span class="visually-hidden">renaming {todo.name}</span>
          </button>
        </li>
        <li>
          <button
            class="btn btn__primary todo-edit"
            type="submit"
            disabled={!name}
          >
            Save<span class="visually-hidden">new name for {todo.name}</span>
          </button>
        </li>
      </ul>
    </form>
  {:else}
    <!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
    <div class="c-cb">
      <input
        type="checkbox"
        id="todo-{todo.id}"
        on:click={onToggle}
        checked={todo.completed}
      />
      <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
    </div>
    <div class="btn-group">
      <button type="button" class="btn" on:click={onEdit} use:focusEditBtn>
        Edit<span class="visually-hidden"> {todo.name}</span>
      </button>
      <button type="button" class="btn btn__danger" on:click={onRemove}>
        Delete<span class="visually-hidden"> {todo.name}</span>
      </button>
    </div>
  {/if}
</div>
