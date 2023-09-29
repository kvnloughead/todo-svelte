<script lang="ts">
  export let onCancel = () => {};
</script>

<svelte:window
  on:keydown={(e) => {
    e.key === 'Escape' && onCancel();
  }}
/>
