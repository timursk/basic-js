const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  let result = [];

  for (let i = 0; i < matrix.length; i++) {
    if (!result[i]) {
      result[i] = [];
    }
    const row = result[i];

    for (let j = 0; j < matrix[i].length; j++) {
      const count = getCellCount(i, j, matrix);
      row[j] = count;
    }
  }

  return result;
}

function getCellCount(initI, initJ, matrix) {
  let count = 0;
  const possibleIdxs = [-1, 0, 1];
  
  possibleIdxs.forEach((possibleIdx1) => {
    const newI = initI + possibleIdx1;
    
    possibleIdxs.forEach((possibleIdx2) => {
      const newJ = initJ + possibleIdx2;
      if (matrix[newI] && (matrix[newI][newJ] === true) && !((initI === newI) && (initJ === newJ))) {
        count++;
      }
    });
  });

  return count;
}

module.exports = {
  minesweeper
};
