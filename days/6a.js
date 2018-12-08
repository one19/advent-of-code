const { getInput, saveMatrix } = require('./utils');

const matrix = {};
let maxX;
let maxY;

const calcDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const logOutput = async () => {
  const textCoords = await getInput('6');

  const coordinates = textCoords
    .split('\n')
    .filter(Boolean)
    .map(e => e.split(/,\s+/).map(coord => Number.parseInt(coord, 10)));

  maxX = Math.max(...coordinates.map(coord => coord[0]));
  maxY = Math.max(...coordinates.map(coord => coord[1]));

  for (let i = 0; i <= Math.round(maxX * 1.5); i++) {
    for (let j = 0; j <= Math.round(maxY * 1.5); j++) {
      const key = `${i}x${j}`;
      const distance = coordinates.reduce(
        (sum, coordinate) =>
          sum + calcDistance(i, j, coordinate[0], coordinate[1]),
        0
      );

      matrix[key] = distance < 10000 ? 'fleeb' : false;
    }
  }

  // fs.writeFileSync('./mat.json', JSON.stringify(matrix, null, 2));

  saveMatrix(matrix, './matrix.txt', [maxX, maxY]);

  const keyCounts = Object.values(matrix).reduce((ret, key) => {
    if (!ret[key]) return { ...ret, [key]: 1 };
    return { ...ret, [key]: ret[key] + 1 };
  }, {});

  console.log('final coord counts', JSON.stringify(keyCounts, null, 2));
};

logOutput();
