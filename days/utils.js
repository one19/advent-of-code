const axios = require('axios');
const fs = require('fs');

const cookie = fs.readFileSync('./.cookie', { encoding: 'utf8' });
axios.defaults.headers.common.cookie = cookie;

/**
 * Returns the input of that day
 *
 * @async
 * @param {String|Number} day - day to grab input for
 * @returns {Object} - data from the request
 */
module.exports.getInput = day =>
  console.log(`getting: https://adventofcode.com/2018/day/${day}/input`) ||
  axios
    .get(`https://adventofcode.com/2018/day/${day}/input`)
    .then(response => response.data)
    .catch(error => error);

/* sums; duh */
module.exports.sum = vals => vals.reduce((sum, val) => sum + val, 0);

// only works well for matrices composed of 52 symbols or less
module.exports.saveMatrix = (matrix, name, dims) => {
  let minX;
  let minY;
  let maxX;
  let maxY;

  if (!dims) {
    const matKeys = Object.keys(matrix);
    minX = Math.min(...matKeys.map(key => key.split('x')[0]));
    minY = Math.min(...matKeys.map(key => key.split('x')[1]));
    maxX = Math.max(...matKeys.map(key => key.split('x')[0]));
    maxY = Math.max(...matKeys.map(key => key.split('x')[1]));
  } else {
    [maxX, maxY] = dims;
    minX = 0;
    minY = 0;
  }

  const matVals = [...new Set(Object.values(matrix))];
  const symbols = matVals.reduce((ret, matVal, i) => {
    const symbol =
      i >= 26 ? String.fromCharCode(65 + i - 26) : String.fromCharCode(97 + i);

    return { ...ret, [matVal]: symbol };
  }, {});

  let matPlot = '';
  for (let j = minY; j <= maxY; j++) {
    for (let i = minX; i <= maxX; i++) {
      const key = `${i}x${j}`;
      const carriageReturn = i % maxX ? '' : '\n';

      const matSymbol =
        typeof matrix[key] === 'string' ? symbols[matrix[key]] : ' ';

      matPlot = `${matPlot}${matSymbol}${carriageReturn}`;
    }
  }

  fs.writeFileSync(name, matPlot);
};
