# Inquirer Interactive List Prompt

An interactive list prompt implementation for [Inquirer](https://github.com/SBoudrias/Inquirer.js/).

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
      { name: 'Option 1', value: 'option1' },
      { name: 'Option 2', value: 'option2' },
      { name: 'Option 3', value: 'option3' },
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
