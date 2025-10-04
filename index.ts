import {
  createPrompt,
  useState,
  useKeypress,
  usePrefix,
  isEnterKey,
  isUpKey,
  isDownKey,
} from '@inquirer/core';
import readline from 'readline';
import chalk from 'chalk';

export type Choice = {
  key: string;
  name: string;
  value: string;
};

export type Config = {
  message: string;
  choices: Array<Choice>;
  default?: string;
  renderSelected?: (choice: Choice, index: number) => string;
  renderUnselected?: (choice: Choice, index: number) => string;
  hideCursor?: boolean;
};

export default async (options: Config) => {
  const {
    renderSelected = (choice: Choice) => chalk.green(`❯ ${choice.name} (${choice.key})`),
    renderUnselected = (choice: Choice) => `  ${choice.name} (${choice.key})`,
    hideCursor = true
  } = options;

  let rl;
  if (hideCursor) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // @ts-expect-error `output` is not documented in inquirer's types
    rl.output.write('\x1B[?25l'); // Hide cursor
  }

  const answer = await createPrompt<string, Config>((config, done) => {
    const { choices, default: defaultKey } = config;
    const [status, setStatus] = useState('pending');
    const [index, setIndex] = useState(choices.findIndex((choice) => choice.value === (defaultKey ?? '')));
    const prefix = usePrefix();

    useKeypress((key, _rl) => {
      if (isEnterKey(key)) {
        const selectedChoice = choices[index];
        if (selectedChoice) {
          setStatus('done');
          done(selectedChoice.value);
        }
      } else if (isUpKey(key)) {
        setIndex(index > 0 ? index - 1 : 0);
      } else if (isDownKey(key)) {
        setIndex(index < choices.length - 1 ? index + 1 : choices.length - 1);
      } else {
        const foundIndex = choices.findIndex((choice) => {
          const choiceValue = choice.value.toLowerCase();
          const keyName = key.name.toLowerCase();
          return choiceValue.startsWith(keyName);
        });
        if (foundIndex !== -1) {
          setIndex(foundIndex);
          // This automatically finishes the prompt. Remove this if you don't want that.
          setStatus('done');
          done(choices[foundIndex]?.value ?? '');
        }
      }
    })

    const message = chalk.bold(config.message);

    if (status === 'done') {
      return `${prefix} ${message} ${chalk.cyan(choices[index]?.name ?? '')}`;
    }

    const renderedChoices = choices
      .map((choice, i) => {
        if (i === index) {
          return renderSelected(choice, index);
        }

        return renderUnselected(choice, i);
      })
      .join('\n');

    return [`${prefix} ${message}`, renderedChoices];
  })(options);

  if (hideCursor && rl) {
    // @ts-expect-error `output` is not documented in inquirer's types
    rl.output.write('\x1B[?25h'); // Show cursor

    rl.close();
  }

  return answer;
};
