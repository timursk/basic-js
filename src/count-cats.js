const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix 
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
function countCats(matrix) {
  const count = matrix.reduce((prev, curr) => {
    let rowCount = curr.reduce((prev, curr) => {
      if (curr === '^^') {
        prev += 1;
      }

      return prev;
    }, 0);

    prev += rowCount;
    return prev;
  }, 0);

  return count;
}

module.exports = {
  countCats
};
