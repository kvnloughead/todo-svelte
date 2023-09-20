<script>
  import FilterButton from './FilterButton.svelte';
  import Search from './Search.svelte';
  import Todo from './Todo.svelte';

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
    if (pattern) {
      todos = todos.filter((t) =>
        t.name.toLowerCase().includes(pattern.toLowerCase()),
      );
    }
    if (filter === 'active') {
      return todos.filter((t) => !t.completed);
    } else if (filter === 'completed') {
      return todos.filter((t) => t.completed);
    } else {
      return todos;
    }
  };

  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id);
    todos[i] = { ...todos[i], ...todo };
  }
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
        <Todo
          {todo}
          on:remove={(e) => removeTodo(e.detail)}
          on:update={(e) => updateTodo(e.detail)}
        />
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
