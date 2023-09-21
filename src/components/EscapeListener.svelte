<script>
  export let onCancel = () => {};
</script>

<svelte:window
  on:keydown={(e) => {
    e.key === 'Escape' && onCancel();
  }}
/>
