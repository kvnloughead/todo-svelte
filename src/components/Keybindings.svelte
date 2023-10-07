<script lang="ts">
  type KeyCombo =
    | "ctrl"
    | "alt"
    | "shift"
    | "meta"
    | `${ModKey}+${string}`
    | string;
  type ModKey = "ctrl" | "alt" | "shift" | "meta";

  /** An object that maps keybindings to their respective handlers. Keys can optionally be preceded by a + separated sequence of modifiers. For example, 'n', 'ctrl+n', and 'ctrl+shift+n' are all acceptable. Allowed modifiers are ctrl, shift, alt, and meta. */
  export let handlers: Record<KeyCombo, (evt: KeyboardEvent) => void>;

  const handleKeydown = (evt: KeyboardEvent) => {
    const target = evt.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
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

  const matchesKeyCombo = (evt: KeyboardEvent, keyCombo: KeyCombo) => {
    const modifiers = ["ctrl", "alt", "shift", "meta"];
    const keys = keyCombo.toLowerCase().split("+");
    const key = keys.pop();

    const hasModifier = (modifier: string) => {
      const modProp = `${modifier}Key` as keyof KeyboardEvent;
      return keys.includes(modifier) ? evt[modProp] : !evt[modProp];
    };

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
      "ctrl+alt+n": (evt) => console.log(`ctrl+alt+n was pressed!`)
    }
  </script>
  <Keybindings {handlers} />
  ```

-->

<svelte:window on:keydown={handleKeydown} />
