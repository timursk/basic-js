const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options = {}) {
  const addition = (options.addition !== undefined ? options.addition : '') + '';
  const separator = options.separator || '+';
  const additionSeparator = options.additionSeparator || '|';
  const repeatTimes = options.repeatTimes || 1;
  const additionRepeatTimes = options.additionRepeatTimes || 1;

  let result = '';

  for (let i = 0; i < repeatTimes; i++) {
    result += ((result ? separator : '') + str);
    
    let additionToResult = '';

    if (addition && additionRepeatTimes) {
      for (let j = 0; j < additionRepeatTimes; j++) {
        additionToResult += ((additionToResult ? additionSeparator : '') + addition);
      }
    }

    result += additionToResult;
  } 

  return result;
}

module.exports = {
  repeater
};
