const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const dict1 = {};
  const dict2 = {};
  let result = 0;

  for (let i = 0; i < s1.length; i++) {
    if (!dict1[s1[i]]) {
      dict1[s1[i]] = 0;
    }
    dict1[s1[i]]++;
  }

  for (let i = 0; i < s2.length; i++) {
    if (!dict2[s2[i]]) {
      dict2[s2[i]] = 0;
    }
    dict2[s2[i]]++;
  }

  Object.keys(dict1).forEach((char) => {
    let count1 = dict1[char];
    let count2 = dict2[char];

    if (!count1 || !count2) {
      return;
    }

    result += Math.min(count1, count2);
  });

  return result;
}

module.exports = {
  getCommonCharacterCount
};
