const { getInput, saveMatrix } = require('../days/utils');

const matrix = {};
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
    Array.from({ length: size * 2 - 1 }, (_, i) => i - size).forEach(deltaY => {
      if (deltaX + deltaY !== size) return;

      const growthKeys = [
        [x + deltaX, y + deltaY],
        [x - deltaX, y + deltaY],
        [x + deltaX, y - deltaY],
        [x - deltaX, y - deltaY],
      ];

      growthKeys.forEach(([xx, yy]) => {
        const growthKey = `${xx}x${yy}`;

        const ooB = isOutOfBounds(xx, yy);
        const alreadyMade = coords.find(e => Object.keys(e)[0] === growthKey);
        const alreadyUsed =
          !matrix[growthKey] || typeof matrix[growthKey] === 'string';

        if (ooB || alreadyMade || alreadyUsed) return {};

        return coords.push({ [growthKey]: coordName });
      });
    });
  });

  return coords;
};

const grow = (coordinates, growthDelta = 0) => {
  const boundaryCoords = coordinates.reduce(
    (allChanges, [x, y]) => [...allChanges, ...deltas(x, y, growthDelta)],
    []
  );

  const nulledCoords = turnDupesIntoNulls(boundaryCoords);

  console.log('delta', growthDelta, nulledCoords.length);
  if (growthDelta >= 20) return matrix;

  nulledCoords.forEach(coord => {
    const key = Object.keys(coord)[0];
    const val = coord[key];

    if (!matrix[key]) {
      return {
        /* found an intersection */
      };
    }

    if (typeof matrix[key] === 'boolean') {
      matrix[key] = val;
    }

    return {
      /* found an already assigned value */
    };
  });

  return grow(coordinates, growthDelta + 1);
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

  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      matrix[`${i}x${j}`] = true;
    }
  }

  coordinates.forEach(([x, y]) => {
    const key = `${x}x${y}`;
    matrix[key] = key;
  });

  grow(coordinates);

  await saveMatrix(matrix, './matrix.txt');
  const inputKeys = Object.values(matrix);

  const keyCounts = inputKeys.reduce((ret, key) => {
    if (!ret[key]) return { ...ret, [key]: 1 };
    return { ...ret, [key]: ret[key] + 1 };
  }, {});

  console.log('final coord counts', keyCounts);
};

logOutput();
