<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let completed = false;

  function checkAll() {
    dispatch('checkAll', !completed);
    completed = !completed;
  }
  function removeCompleted() {
    dispatch('removeCompleted');
  }
</script>

<div class="btn-group">
  <button type="button" class="btn btn__primary" on:click={checkAll}
    >{!completed ? 'Check' : 'Uncheck'} all</button
  >
  <button type="button" class="btn btn__primary" on:click={removeCompleted}
    >Remove completed</button
  >
</div>
