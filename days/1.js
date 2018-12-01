const { getInput } = require('./utils');

const logOutput = async () => {
  const dayInput = await getInput('1');

  const args = dayInput.split('\n');

  // but also, just check the damned dayInput before running this
  /* eslint-disable-next-line no-eval */
  console.log(args.reduce((answer, arg) => eval(`${answer} ${arg}`), 0));
};

logOutput();
