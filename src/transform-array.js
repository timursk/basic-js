const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
const controls = {
  '--discard-next': (arr, currentIdx, initArr) => {
    const nextIdx = currentIdx + 1;
    if ((nextIdx >= initArr.length) || controls[initArr[nextIdx]] || (initArr[nextIdx] === undefined)) {
      return {
        arr,
        currentIdx
      };
    }

    return {
      arr,
      currentIdx: nextIdx,
    }
  },
  '--discard-prev': (arr, currentIdx, initArr) => {
    if ((initArr[currentIdx - 2] === '--discard-next') || controls[initArr[currentIdx - 1]] || (initArr[currentIdx - 1] === undefined)) {
      return {
        arr,
        currentIdx
      };
    }

    arr.splice(arr.length - 1);

    return {
      arr,
      currentIdx,
    }
  },
  '--double-next': (arr, currentIdx, initArr) => {
    const nextIdx = currentIdx + 1;
    const next = initArr[nextIdx];

    if ((nextIdx >= initArr.length) || controls[next] || (next === undefined)) {
      return {
        arr,
        currentIdx
      };
    }

    arr.push(next);

    return {
      arr,
      currentIdx,
    }
  },
  '--double-prev': (arr, currentIdx, initArr) => {
    if ((initArr[currentIdx - 2] === '--discard-next') || controls[initArr[currentIdx - 1]] || (initArr[currentIdx - 1] === undefined)) {
      return {
        arr,
        currentIdx
      };
    }

    const last = arr[arr.length - 1];
    arr.push(last);
    
    return {
      arr,
      currentIdx,
    }
  },
}

function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`'arr' parameter must be an instance of the Array!`);
  }

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];

    if (controls[elem]) {
      const fn = controls[elem];
      const fnRes = fn(result, i, arr);
      i = fnRes.currentIdx;
    }
    else {
      result.push(elem);
    }
  }

  return result;
}
module.exports = {
  transform
};
