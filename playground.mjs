import prompt from './index.mjs';

(async () => {
  const answer = await prompt({
    message: 'What color should we use:',
    choices: [
      { name: 'Gray', value: 'gray', key: 'a' },
      { name: 'Green', value: 'green', key: 'b' },
      { name: 'Quit', value: 'quit', key: 'q' },
    ],
    renderSelected: choice => `❯ ${choice.name} (${choice.key})`, // optional
    renderUnselected: choice => `  ${choice.name} (${choice.key})`, // optional
  });

  console.log(`Selected option: ${answer}`);
})();
