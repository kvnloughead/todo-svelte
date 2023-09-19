<script>
  import FilterButton from './FilterButton.svelte';
  import Search from './Search.svelte';

  export let todos = [];

  let newTodoName = '';
  let newTodoId;

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  $: {
    if (totalTodos === 0) {
      newTodoId = 1;
    } else {
      // make new ID one greater than largest existing id
      newTodoId = Math.max(...todos.map((t) => t.id)) + 1;
    }
  }
  function addTodo() {
    todos = [...todos, { id: newTodoId, name: newTodoName, completed: false }];
    newTodoName = '';
  }
  function removeTodo(todo) {
    todos = todos.filter((t) => todo.id !== t.id);
  }
  function removeCompleted() {
    todos = todos.filter((t) => !t.completed);
  }

  let filter = 'all';
  let pattern = '';

  const filterTodos = (filter, todos, pattern) => {
    if (filter === 'active') {
      return todos.filter((t) => !t.completed);
    } else if (filter === 'completed') {
      return todos.filter((t) => t.completed);
    } else if (pattern) {
      return todos.filter((t) =>
        t.name.toLowerCase().includes(pattern.toLowerCase()),
      );
    } else {
      return todos;
    }
  };
</script>

<h1>To-do list</h1>
<!-- Todos.svelte -->
<div class="todoapp stack-large">
  <!-- NewTodo -->
  <form on:submit|preventDefault={addTodo}>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg"> Add new todo </label>
    </h2>
    <input
      bind:value={newTodoName}
      type="text"
      id="todo-0"
      autocomplete="off"
      class="input input__lg"
    />
    <button type="submit" disabled="" class="btn btn__primary btn__lg">
      Add
    </button>
  </form>

  <Search bind:pattern />
  <FilterButton bind:filter />

  <!-- TodosStatus -->
  <h2 id="list-heading">
    {completedTodos} out of {totalTodos} items completed
  </h2>

  <!-- Todos -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos, pattern) as todo (todo.id)}
      <li class="todo">
        <div class="stack-small">
          <div class="c-cb">
            <input
              type="checkbox"
              id="todo-{todo.id}"
              on:click={() => (todo.completed = !todo.completed)}
              checked={todo.completed}
            />
            <label for="todo-{todo.id}" class="todo-label"> {todo.name} </label>
          </div>
          <div class="btn-group">
            <button type="button" class="btn">
              Edit <span class="visually-hidden">{todo.name}</span>
            </button>
            <button
              type="button"
              class="btn btn__danger"
              on:click={() => removeTodo(todo)}
            >
              Delete <span class="visually-hidden">{todo.name}</span>
            </button>
          </div>
        </div>
      </li>
    {:else}
      <li>Nothing to do here!</li>
    {/each}
  </ul>

  <hr />

  <!-- MoreActions -->
  <div class="btn-group">
    <button type="button" class="btn btn__primary">Check all</button>
    <button type="button" class="btn btn__primary" on:click={removeCompleted}
      >Remove completed</button
    >
  </div>
</div>
