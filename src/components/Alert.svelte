<script>
  import { alert } from '../stores.js';

  const removeAlert = () => ($alert = '');
</script>

{#if $alert}
  <button
    on:click={removeAlert}
    on:keydown={(e) => {
      if (e.key === 'Escape') removeAlert();
    }}
  >
    {$alert}
  </button>
{/if}

<style>
  button {
    position: fixed;
    cursor: pointer;
    margin: 1rem 1.5rem 0;
    right: 0;
    display: flex;
    align-items: center;
    border-radius: 0.2rem;
    background-color: #565656;
    color: #fff;
    font-weight: 700;
    padding: 1.5rem;
    font-size: 1.5rem;
    z-index: 100;
    opacity: 95%;
  }
</style>
