<script>
  export let onNewTodoFocus = (evt) => {};
  export let onUpArrow = () => {};
  export let onDownArrow = () => {};

  const handleKeydown = (evt) => {
    switch (evt.key) {
      case "n":
        onNewTodoFocus(evt);
        break;
      case "ArrowUp":
        onUpArrow();
        break;
      case "ArrowDown":
        onDownArrow();
        break;
      default:
        break;
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />
