<script lang="ts">
  export let pattern = '';
  export let onclick = (pattern) => {};
  $: onclick(pattern);
</script>

<form>
  <h2 class="label-wrapper">
    <label for="search-pattern" class="label__lg">Search todos</label>
  </h2>
  <input
    bind:value={pattern}
    type="text"
    id="search-pattern"
    autocomplete="off"
    class="input input__lg"
  />
</form>
