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
