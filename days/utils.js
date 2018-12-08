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

// only works well for matrices composed of 52 symbols or less
module.exports.saveMatrix = (matrix, name) => {
  const matKeys = Object.keys(matrix);

  const matVals = [...new Set(Object.values(matrix))];
  const symbols = matVals.reduce((ret, matVal, i) => {
    const symbol =
      i >= 26 ? String.fromCharCode(65 + i - 26) : String.fromCharCode(97 + i);

    return { ...ret, [matVal]: symbol };
  }, {});

  console.log(symbols);

  const minX = Math.min(...matKeys.map(key => key.split('x')[0]));
  const minY = Math.min(...matKeys.map(key => key.split('x')[1]));
  const maxX = Math.max(...matKeys.map(key => key.split('x')[0]));
  const maxY = Math.max(...matKeys.map(key => key.split('x')[1]));

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
