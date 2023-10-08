<script lang="ts">
  import { Filter } from "../types/filter.enum";

  export let filter: Filter = Filter.ALL;
  let filtersEl: HTMLElement;

  export function focus() {
    filtersEl.querySelector("button")?.focus();
  }
</script>

<div class="filters" bind:this={filtersEl}>
  <h2 class="label__horizontal">Filters</h2>
  <ul class="btn-group">
    <li>
      <button
        class="btn toggle-btn"
        aria-pressed={filter === Filter.ALL}
        class:btn__primary={filter === Filter.ALL}
        on:click={() => (filter = Filter.ALL)}
      >
        <span class="visually-hidden">Show</span>
        <span>All</span>
        <span class="visually-hidden">tasks</span>
      </button>
    </li>
    <li>
      <button
        class="btn toggle-btn"
        aria-pressed={filter === Filter.ACTIVE}
        class:btn__primary={filter === Filter.ACTIVE}
        on:click={() => (filter = Filter.ACTIVE)}
      >
        <span class="visually-hidden">Show</span>
        <span>Active</span>
        <span class="visually-hidden">tasks</span>
      </button>
    </li>
    <li>
      <button
        class="btn toggle-btn"
        aria-pressed={filter === Filter.COMPLETED}
        class:btn__primary={filter === Filter.COMPLETED}
        on:click={() => (filter = Filter.COMPLETED)}
      >
        <span class="visually-hidden">Show</span>
        <span>Completed</span>
        <span class="visually-hidden">tasks</span>
      </button>
    </li>
  </ul>
</div>
