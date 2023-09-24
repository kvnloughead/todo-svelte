<script>
  import FilterButton from './FilterButton.svelte';
  import MoreActions from './MoreActions.svelte';
  import NewTodo from './NewTodo.svelte';
  import Search from './Search.svelte';
  import Todo from './Todo.svelte';
  import TodosStatus from './TodosStatus.svelte';

  export let todos = [];

  let newTodoName = '';
  let newTodoId, nameEl, todosStatus;

  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  function addTodo(name) {
    todos = [...todos, { id: newTodoId, name, completed: false }];
    newTodoName = '';
  }
  function removeTodo(todo) {
    todos = todos.filter((t) => todo.id !== t.id);
    todosStatus.focus();
  }
  function removeCompleted() {
    todos = todos.filter((t) => !t.completed);
    todosStatus.focus();
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

<div class="todoapp stack-large">
  <NewTodo
    bind:nameEl
    on:addTodo={(e) => {
      addTodo(e.detail);
    }}
  />
  <Search bind:pattern />
  <FilterButton bind:filter />
  <TodosStatus {todos} bind:this={todosStatus} />

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
