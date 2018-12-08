const { getInput, saveMatrix } = require('../days/utils');

let minX;
let maxX;
let minY;
let maxY;

const isOutOfBounds = (x, y) => x > maxX || x < minX || y > maxY || y < minY;

const turnDupesIntoNulls = coords =>
  coords.reduce((nulled, coord, i, original) => {
    const coordName = Object.keys(coord)[0];

    const foundInRemaining = original
      .slice(i + 1)
      .find(e => Object.keys(e)[0] === coordName);
    const foundInNulledList = nulled.find(e => Object.keys(e)[0] === coordName);

    if (foundInRemaining) return [...nulled, { [coordName]: null }];
    if (foundInNulledList) return nulled;

    return [...nulled, coord];
  }, []);

const deltas = (x, y, size) => {
  const coordName = `${x}x${y}`;
  const coords = [];

  // top and bottom row construction
  Array.from({ length: size * 2 + 1 }, (_, i) => i - size).forEach(deltaX => {
    if (
      isOutOfBounds(x + deltaX, y - size) ||
      isOutOfBounds(x + deltaX, y + size)
    ) {
      return;
    }

    const topCoord = `${x + deltaX}x${y - size}`;
    const bottomCoord = `${x + deltaX}x${y + size}`;
    coords.push({ [topCoord]: coordName });
    coords.push({ [bottomCoord]: coordName });
  });

  // left and right mini-rows construction
  Array.from({ length: size * 2 - 1 }, (_, i) => i - size).forEach(deltaY => {
    if (
      isOutOfBounds(x - size, y + deltaY) ||
      isOutOfBounds(x + size, y + deltaY)
    ) {
      return;
    }

    const leftCoord = `${x - size}x${y + deltaY}`;
    const rightCoord = `${x + size}x${y + deltaY}`;
    coords.push({ [leftCoord]: coordName });
    coords.push({ [rightCoord]: coordName });
  });

  return coords;
};

const grow = (coordinates, matrix, growthDelta = 0) => {
  const boundaryCoords = coordinates.reduce(
    (allChanges, [x, y]) => [...allChanges, ...deltas(x, y, growthDelta)],
    []
  );

  const nulledCoords = turnDupesIntoNulls(boundaryCoords);

  console.log('delta', growthDelta, nulledCoords.length);
  if (growthDelta >= 20) return matrix;

  const modifiedMatrix = { ...matrix };
  nulledCoords.forEach(coord => {
    const key = Object.keys(coord)[0];
    const val = coord[key];

    if (!modifiedMatrix[key]) {
      return {
        /* found an intersection */
      };
    }

    if (typeof modifiedMatrix[key] === 'boolean') {
      modifiedMatrix[key] = val;
    }

    return {
      /* found an already assigned value */
    };
  });

  return grow(coordinates, modifiedMatrix, growthDelta + 1);
};

const logOutput = async () => {
  const textCoords = await getInput('6');

  const coordinates = textCoords
    .split('\n')
    .filter(Boolean)
    .map(e => e.split(/,\s+/).map(coord => Number.parseInt(coord, 10)));

  minX = Math.min(...coordinates.map(coord => coord[0]));
  minY = Math.min(...coordinates.map(coord => coord[1]));
  maxX = Math.max(...coordinates.map(coord => coord[0]));
  maxY = Math.max(...coordinates.map(coord => coord[1]));

  const matrix = {};
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      matrix[`${i}x${j}`] = true;
    }
  }

  const finalMatrix = grow(coordinates, matrix);
  await saveMatrix(finalMatrix, './matrix.txt');
  const inputKeys = Object.values(finalMatrix);

  const keyCounts = inputKeys.reduce((ret, key) => {
    if (!ret[key]) return { ...ret, [key]: 1 };
    return { ...ret, [key]: ret[key] + 1 };
  }, {});

  console.log('final coord counts', keyCounts);
};

logOutput();
