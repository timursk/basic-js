const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const result = {};

  domains.forEach((domain) => {
    const arr = domain.split('.');
    let addendum = '';
    for (let i = (arr.length - 1); i >= 0; i--) {
      const key = addendum + '.' + arr[i];
      if (!result[key]) {
        result[key] = 0;
      }
      result[key]++;
      addendum = key;
    }
  });

  return result;
}

module.exports = {
  getDNSStats
};
