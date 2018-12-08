const { getInput } = require('./utils');

let tree = {};

const decomposeKnown = (arrayBits, id = 0) => {
  const childCount = arrayBits[0];
  const metaLength = arrayBits[1];

  const metaSum = arrayBits
    .slice(-1 * metaLength)
    .reduce((sum, val) => sum + val, 0);

  tree[id] = metaSum;

  if (childCount === 0) return;

  const childBits = arrayBits.slice(2, -1 * metaLength);
  if (childCount === 1) return decomposeKnown(childBits, id + 1);
  return decomposeUnknown(childBits, id + 1, childCount);
};

const decomposeUnknown = (arrayBits, id, childCount) => {
  const count = childCount;

  const thisChildCount = arrayBits[0];
  const metaLength = arrayBits[1];

  while (count) {
    if (thisChildCount > 1);
  }
};

const logOutput = async () => {
  const treeInput = await getInput('8');

  const inputNumbers = treeInput
    .replace('\n', '')
    .split(' ')
    .map(e => Number.parseInt(e, 10));

  tree = decomposeKnown(inputNumbers);

  console.log('final coord counts', JSON.stringify(tree, null, 2));
};

logOutput();
