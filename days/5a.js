const { getInput } = require('./utils');

const alphabet = Array(26)
  .fill(0)
  .map((_, i) => String.fromCharCode(i + 97));

const regex = new RegExp(
  alphabet.map(e => `${e}${e.toUpperCase()}|${e.toUpperCase()}${e}`).join('|'),
  'g'
);

const replaceBabyCaps = (polymer, count) => {
  const newPolymer = polymer.replace(regex, '');

  if (newPolymer.length === polymer.length) {
    console.log(`took ${count} iterations!`);
    return polymer;
  }
  return replaceBabyCaps(newPolymer, count + 1);
};

const logOutput = async () => {
  const polymer = await getInput('5');

  const smallymers = alphabet.map(e => {
    const reducedPolymer = polymer.replace(new RegExp(e, 'gi'), '');
    return replaceBabyCaps(reducedPolymer, 0).replace('\n', '').length;
  });

  const minLength = Math.min(...smallymers);
  const unit = alphabet[smallymers.findIndex(e => e === minLength)];

  console.log('final min length:', minLength, '\nfor unit:', unit);
};

logOutput();
