const { getInput } = require('./utils');

const makebabyCapsRegex = () => {
  const alphabet = Array(26)
    .fill(0)
    .map((_, i) => String.fromCharCode(i + 97));

  return new RegExp(
    alphabet
      .map(e => `${e}${e.toUpperCase()}|${e.toUpperCase()}${e}`)
      .join('|'),
    'g'
  );
};

const regex = makebabyCapsRegex();
console.log(regex);

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

  const smallymer = replaceBabyCaps(polymer, 0).replace('\n', '');

  console.log('final length:', smallymer.length);
};

logOutput();
