<script>
  import FilterButton from './FilterButton.svelte';
  import MoreActions from './MoreActions.svelte';
  import NewTodo from './NewTodo.svelte';
  import Search from './Search.svelte';
  import Todo from './Todo.svelte';

  export let todos = [];

  let newTodoName = '';
  let newTodoId, nameEl;

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

  function addTodo(name) {
    todos = [...todos, { id: newTodoId, name, completed: false }];
    newTodoName = '';
  }
  function removeTodo(todo) {
    todos = todos.filter((t) => todo.id !== t.id);
  }
  function removeCompleted() {
    todos = todos.filter((t) => !t.completed);
    nameEl.focus();
  }
  function checkAll(completed) {
    todos = todos.map((t) => ({ ...t, completed }));
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
  <NewTodo
    autofocus
    bind:nameEl
    on:addTodo={(e) => {
      addTodo(e.detail);
    }}
  />
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

  <MoreActions
    {todos}
    on:checkAll={(e) => checkAll(e.detail)}
    on:removeCompleted={removeCompleted}
  />
</div>
