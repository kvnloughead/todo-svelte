<script>
  /** An object that maps keybindings to their respective handlers. */
  export let handlers;

  const handleKeydown = (evt) => {
    if (evt.key in handlers) {
      handlers[evt.key](evt);
    }
  };
</script>

<!--
@component
A component to manage your keybindings. 
  @prop {object} `handlers` - an object that maps keybindings to their respective handlers. 

  @example 
  ```js
  <script>
    const handlers = {
      n: (evt) => console.log(`n was pressed!`)
    }
  </script>
  <Keybindings {handlers} />
  ```

-->

<svelte:window on:keydown={handleKeydown} />
