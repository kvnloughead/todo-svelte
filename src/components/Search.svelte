<script lang="ts">
  export let pattern = "";
  let inputEl: HTMLElement;

  export function focus() {
    inputEl.focus();
  }
</script>

<form>
  <h2 class="label-wrapper">
    <label for="search-pattern" class="label__lg">Search todos</label>
  </h2>
  <input
    bind:value={pattern}
    bind:this={inputEl}
    type="text"
    id="search-pattern"
    autocomplete="off"
    class="input input__lg"
  />
</form>
