<script>
  import Todos from './components/Todos.svelte';
  let todos = [
    { id: 1, name: 'Create a Svelte starter app', completed: true },
    { id: 2, name: 'Create first component', completed: true },
    { id: 3, name: 'Complete rest of tutorial', completed: false },
  ];
</script>

<Todos {todos} />
Svelte app
