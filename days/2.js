const { getInput } = require('./utils');
/* eslint-disable no-param-reassign */

const countEachParam = (boxId, lookedForCount) => {
  const chars = boxId.split('');

  const charsWithCountZero = [...new Set(chars)].map(char => ({
    name: char,
    count: 0,
  }));

  chars.forEach(char =>
    charsWithCountZero.find(holder => {
      if (holder.name === char) holder.count++;
      return null;
    })
  );

  const foundCount = charsWithCountZero.find(
    holder => holder.count === lookedForCount
  );

  if (foundCount) return true;
  return false;
};

const logOutput = async () => {
  const dayInput = await getInput('2');

  const boxIds = dayInput.split('\n');

  const counts = boxIds.reduce(
    (resultant, boxId) => {
      if (countEachParam(boxId, 2)) resultant.two++;
      if (countEachParam(boxId, 3)) resultant.three++;

      return resultant;
    },
    { two: 0, three: 0 }
  );

  console.log(
    'counts:',
    JSON.stringify(counts, null, 2),
    '\nresultant multiplication:',
    counts.two * counts.three
  );
};

logOutput();
