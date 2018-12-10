const { times } = require('lodash');
const { getInput, saveMatrix, sum } = require('./utils');

let coordsAndVelocities = [];

const getMatrix = coords => {
  const neoMatrix = {};

  coords.forEach(({ x, y }) => {
    const key = `${x}x${y}`;
    neoMatrix[key] = 'fleeb';
  });

  return neoMatrix;
};

const getDensity = points => {
  const pointsCount = points.length;
  const sumX = sum(points.map(e => e.x));
  const sumY = sum(points.map(e => e.y));

  const averageX = sumX / pointsCount;
  const averageY = sumY / pointsCount;

  const diffX = sum(points.map(e => Math.abs(e.x - averageX)));
  const diffY = sum(points.map(e => Math.abs(e.y - averageY)));

  const density = (diffX + diffY) / (2 * pointsCount);

  return density;
};

const moveCoord = ({ x, y, vx, vy }) => ({ x: x + vx, y: y + vy, vx, vy });

const logOutput = async () => {
  const textCoords = await getInput('10');

  coordsAndVelocities = textCoords
    .split('\n')
    .filter(Boolean)
    .map(e => e.match(/-*\d+/g).map(num => Number.parseInt(num, 10)))
    .map(([x, y, vx, vy]) => ({ x, y, vx, vy }));

  // ~11000 times exposed 10226s (+1 for index 0) as the lowest density point:
  times(10175, i => {
    coordsAndVelocities = coordsAndVelocities.map(e => moveCoord(e));
    console.log(
      `i: ${i}    density: ${Math.round(getDensity(coordsAndVelocities))}`
    );
  });

  times(55, i => {
    coordsAndVelocities = coordsAndVelocities.map(e => moveCoord(e));
    saveMatrix(getMatrix(coordsAndVelocities), `./star_charts/${i}.txt`);
  });
};

logOutput();
