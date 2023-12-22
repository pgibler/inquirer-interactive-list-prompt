# Inquirer Interactive List Prompt

An interactive list prompt implementation for [Inquirer](https://github.com/SBoudrias/Inquirer.js/).

You can select a choice by using the arrow keys + Enter or by pressing the key associated with the choice.
```javascript
? Choose an option:
>   Run command (D)
    Quit (Q)
```

## Installation

```sh
npm install inquirer-interactive-list-prompt
```

## Usage

```js
import prompt from 'inquirer-interactive-list-prompt';

(async () => {
  const answer = await prompt({
    message: 'Select an option:',
    choices: [
      { name: 'Run', value: 'run', key: 'r' },
      { name: 'Quit', value: 'quit', key: 'q' },
    ],
  });

  console.log(`Selected option: ${answer}`);
})();
```

## API

### `prompt(options)`

Prompts the user with an interactive list prompt.

#### `options`

Type: `object`

##### `message`

Type: `string`
Required: `true`

The message to display to the user.

##### `choices`

Type: `Array<{ name: string, value: any }>`
Required: `true`

An array of choices to display to the user.

##### `renderer`

Type: `(line: string, index: number) => string`
Default: `(line) => line`

A function that is called to render each choice in the prompt. The function should return a string that will be displayed to the user.

##### `hideCursor`

Type: `boolean`
Default: `true`

Whether to hide the cursor while the prompt is active.

## License

MIT
