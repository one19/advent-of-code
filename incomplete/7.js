const { getInput } = require('./utils');

const logOutput = async () => {
  const stepsInput = await getInput('7');
  const steps = stepsInput
    .split('\n')
    .filter(Boolean)
    .map(e => e.match(/\s[A-Z]\s/g).map(s => s.replace(/\s/, '')));

  const requiresContainer = steps.reduce(
    (req, step) => ({
      ...req,
      [step[1]]: req[step[1]] ? [...req[step[1]], req[0]] : [req[0]],
    }),
    {}
  );

  console.log('final coord counts', JSON.stringify(requiresContainer, null, 2));
};

logOutput();
