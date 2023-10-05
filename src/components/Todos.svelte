<script lang="ts">
  import { Filter } from "../types/filter.enum";
  import type { TodoType } from "../types/todo.type";
  import { alert } from "../stores";

  import Alert from "./Alert.svelte";
  import FilterButton from "./FilterButton.svelte";
  import MoreActions from "./MoreActions.svelte";
  import NewTodo from "./NewTodo.svelte";
  import Search from "./Search.svelte";
  import Todo from "./Todo.svelte";
  import TodosStatus from "./TodosStatus.svelte";
  import Keybindings from "./Keybindings.svelte";

  const shortcutHandlers = {
    n: (evt: KeyboardEvent) => {
      evt.preventDefault();
      nameEl.focus();
    },
  };

  export let todos: TodoType[];

  let newTodoId: number, nameEl: HTMLElement;
  let todosStatus: TodosStatus;
  let pattern = "";

  $: $alert = `Browsing ${filter} todos`;
  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  function addTodo(name: string) {
    todos = [...todos, { id: newTodoId, name, completed: false }];
    $alert = `Added todo: '${name}'`;
  }

  function removeTodo(todo: TodoType) {
    todos = todos.filter((t) => todo.id !== t.id);
    $alert = `Removed todo: '${todo.name}'`;
    todosStatus.focus();
  }

  function removeCompleted() {
    todos = todos.filter((t) => !t.completed);
    $alert = `Removed all completed todos`;
    todosStatus.focus();
  }

  function checkAll(completed: boolean) {
    todos = todos.map((t) => ({ ...t, completed }));
    $alert = `${completed ? "Checked" : "Unchecked"} all todos`;
  }

  let filter = Filter.ALL;
  const filterTodos = (filter: Filter, todos: TodoType[], pattern: string) => {
    if (pattern) {
      todos = todos.filter((t) =>
        t.name.toLowerCase().includes(pattern.toLowerCase()),
      );
    }
    if (filter === Filter.ACTIVE) {
      return todos.filter((t) => !t.completed);
    } else if (filter === Filter.COMPLETED) {
      return todos.filter((t) => t.completed);
    } else {
      return todos;
    }
  };

  function updateTodo(todo: TodoType) {
    const i = todos.findIndex((t) => t.id === todo.id);
    if (todos[i].name !== todo.name) {
      $alert = `Todo '${todos[i].name}' has been renamed to '${todos[i].name}'`;
    } else if (todos[i].completed !== todo.completed) {
      $alert = `Todo '${todo.name}' has been marked ${
        todo.completed ? "completed" : "active"
      }`;
    }
    todos[i] = { ...todos[i], ...todo };
  }
</script>

<Keybindings handlers={shortcutHandlers} />

<header>
  <Alert />
  <h1>To-do list</h1>
</header>

<main class="todoapp stack-large">
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
</main>
