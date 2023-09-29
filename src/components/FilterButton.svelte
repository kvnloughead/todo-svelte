<script lang="ts">
  export let filter = 'all';
  export let onclick = (filter) => {};
  $: onclick(filter);
</script>

<div class="filters btn-group">
  <h2 class="label__horizontal">Filters</h2>
  <button
    class="btn toggle-btn"
    aria-pressed={filter === 'all'}
    class:btn__primary={filter === 'all'}
    on:click={() => (filter = 'all')}
  >
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button
    class="btn toggle-btn"
    aria-pressed={filter === 'active'}
    class:btn__primary={filter === 'active'}
    on:click={() => (filter = 'active')}
  >
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button
    class="btn toggle-btn"
    aria-pressed={filter === 'completedkkk'}
    class:btn__primary={filter === 'completed'}
    on:click={() => (filter = 'completed')}
  >
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>
