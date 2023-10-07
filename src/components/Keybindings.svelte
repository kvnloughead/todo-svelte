<script>
  /** An object that maps keybindings to their respective handlers. */
  export let handlers;

  const handleKeydown = (evt) => {
    debugger;
    if (evt.target.tagName === "INPUT" || evt.target.tagName === "TEXTAREA") {
      return;
    }

    for (const keyCombo in handlers) {
      if (matchesKeyCombo(evt, keyCombo)) {
        evt.preventDefault();
        handlers[keyCombo](evt);
        return;
      }
    }
  };

  const matchesKeyCombo = (evt, keyCombo) => {
    const modifiers = ["ctrl", "alt", "shift", "meta"];
    const keys = keyCombo.toLowerCase().split("+");
    const key = keys.pop();

    const hasModifier = (modifier) =>
      keys.includes(modifier) ? evt[`${modifier}Key`] : !evt[`${modifier}Key`];

    return (
      key === evt.key.toLowerCase() &&
      modifiers.every((mod) => hasModifier(mod))
    );
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
