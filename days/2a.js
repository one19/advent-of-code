const { getInput } = require('./utils');
/* eslint-disable no-param-reassign */

const get1DiffLocation = (boxId, comparisonId) => {
  let diff = 0;
  let diffLocation = 0;

  for (let i = boxId.length; i > 0; i--) {
    if (boxId[i] !== comparisonId[i]) {
      diffLocation = i;
      diff++;
    }
  }

  if (diff !== 1) return null;
  return diffLocation;
};

const find1AgainstAll = (workingId, comparisonIdsArray) =>
  comparisonIdsArray.reduce((foundLocation, comparisonId) => {
    const diffLocation = get1DiffLocation(workingId, comparisonId);

    return foundLocation || diffLocation;
  }, null);

const logOutput = async () => {
  const dayInput = await getInput('2');

  const boxIds = dayInput.split('\n');

  let workingId = '';
  let diffCharacterIndex = null;

  while (boxIds.length > 0) {
    workingId = boxIds.pop();
    diffCharacterIndex = find1AgainstAll(workingId, boxIds);

    if (diffCharacterIndex) break;
  }

  console.log(
    'id:',
    workingId,
    '\nwith diff character removed:',
    `${workingId.slice(0, diffCharacterIndex)}${workingId.slice(
      diffCharacterIndex + 1,
      workingId.length
    )}`
  );
};

logOutput();
