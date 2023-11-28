<script lang="ts">
  /**
   * A Command Palette component for handling user commands.
   *
   * Props:
   * @prop {string} prompt - The prompt text to display in the command input. Default is an empty string.
   * @prop {string} label - The label for the command palette, defaulting to "Command Palette".
   * @prop {Record<string, Function>} handlers - An object mapping command strings to handler functions.
   *
   * * Methods:
   * @function focus - Focuses the command input element.
   *
   * Usage:
   * The component takes a set of command handlers as props. Each command is a key in the `handlers` object, and the corresponding value is a function to execute for that command.
   *  - The commands can consist of multiple, space-separated words.
   *  - The handlers receive a possibly empty array of strings as containing containing any additional arguments that are passed entered after the command itself.
   *  - Unknown commands can be handled by implementing the `handlers.onError` function, which receives an error as a parameter.
   *
   * Example:
   * <CommandPalette prompt={"> "} {handlers} />
   *
   * In this example, `handlers` could be an object like:
   *
   * {
   *   "check all": () => checkAll(true),
   *   "uncheck all": () => checkAll(false),
   *   "remove completed": () => removeCompleted(),
   *   "search": () => searchInstance.focus(),
   *   "new": (args: string[]) => {...},
   *   "onError": (err: Error) => {...}
   * }
   *
   * The `new` command demonstrates how to handle arguments passed with the command.
   */
  export let prompt = "";
  export let label = "Command Palette";

  let command: string;
  let commandInputEl: HTMLElement;

  export function focus() {
    commandInputEl.focus();
  }

  export let handlers: Record<string, Function>;
  let commands = Object.keys(handlers);

  function parseCommand(command: string) {
    const baseCommand = commands.find((cmd) => command.startsWith(cmd));
    if (baseCommand === undefined) {
      return null;
    }
    const args = command.replace(baseCommand, "").split(" ").slice(1);
    return { baseCommand, args };
  }

  function runCommand(evt: SubmitEvent) {
    evt.preventDefault();
    const parsed = parseCommand(command);
    if (parsed === null) {
      handlers["onError"] &&
        handlers["onError"](new Error(`No such command: ${command}`));
      console.error(`No such command: ${command}`);
      return;
    }
    handlers[parsed.baseCommand](parsed.args);
  }
</script>

<form class="command-palette hidden" on:submit={runCommand}>
  <label for="cmd-palette">{label}</label>
  <div class="container">
    <span class="prompt">{prompt}</span>
    <input
      type="text"
      id="cmd-palette"
      autocomplete="off"
      bind:value={command}
      bind:this={commandInputEl}
    />
  </div>
</form>

<style>
  .command-palette {
    width: 100%;
    background-color: #fff;
    font-size: 2.4rem;
  }

  .container {
    width: 100%;
    display: flex;
    border: 2px solid #000;
    position: relative;
  }

  label {
    display: inline-block;
    line-height: 1.01567;
    font-weight: 300;
    margin-bottom: 1rem;
    text-align: left;
    margin: 0 auto 1rem;
  }

  .prompt {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    color: #4d4d4d80;
  }

  input {
    width: 100%;
    border: none;
    padding: 2rem;
  }

  input:focus {
    outline: 3px solid #228bec;
    outline-offset: 0;
  }
</style>
