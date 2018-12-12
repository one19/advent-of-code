const { sum, times } = require('lodash');

const getPowerForCoord = (input, x, y) => {
  const rackId = x + 10;
  const powerStart = rackId * y;
  const serialIncrease = powerStart + input;
  const power = serialIncrease * rackId;
  const hundo = `${power}`.slice(-3, -2);
  const dingle = Number.parseInt(hundo, 10) - 5;
  return dingle;
};

const getPowerForBox = (input, x, y, size) =>
  sum(
    times(size, e => x + e).map(xs =>
      sum(times(size, e => y + e).map(ys => getPowerForCoord(input, xs, ys)))
    )
  );

const logOutput = input => {
  const res = times(298, size => {
    const mat = {};
    console.log(size);

    times(299 - size, i => {
      times(299 - size, j => {
        const key = `${i + 1}x${j + 1}`;
        mat[key] = getPowerForBox(input, i + 1, j + 1, size);
      });
    });

    const maxVal = Math.max(...Object.values(mat));
    const maxCoord = Object.keys(mat).filter(key => mat[key] === maxVal);

    return { maxVal, maxCoord, size };
  });

  const maxVal = Math.max(...res.map(e => e.maxVal));
  const max = res.find(e => e.maxVal === maxVal);

  console.log(max);
};

logOutput(9424);
