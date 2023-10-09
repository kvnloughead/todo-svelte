<script lang="ts">
  export let prompt = "";
  export let label = "Command Palette";

  let command: string;
  let commandInputEl: HTMLElement;

  export function focus() {
    commandInputEl.focus();
  }
  export let commands: Record<string, Function>;

  function runCommand(evt: SubmitEvent) {
    evt.preventDefault();
    commands[command]();
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
