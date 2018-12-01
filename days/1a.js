const { getInput } = require('./utils');

const logOutput = async () => {
  const dayInput = await getInput('1');

  const argsList = dayInput.split('\n');

  let i = 0;
  let setLength = 0;
  let currentNumber = 0;
  const answers = new Set([]);

  while (i < argsList.length) {
    /* eslint-disable-next-line no-eval */
    currentNumber = eval(`${currentNumber} ${argsList[i]}`);

    answers.add(currentNumber);
    if (setLength === answers.size) break;

    i++;
    setLength = answers.size;
    if (i === argsList.length - 1) i = 0;
  }
  console.log('duplicate found: ', currentNumber);
};

logOutput();
