const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];
    let count = 1;
    while (str[i+1] === currentChar) {
      i++;
      count++;
    }

    if (count > 1) {
      result += (count + currentChar);
    }
    else {
      result += currentChar;
    }
  }

  return result;
}

module.exports = {
  encodeLine
};
