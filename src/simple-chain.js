const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  currentChain: null,

  getLength() {
    if (!this.currentChain) {
      return 0;
    }

    return this.currentChain.split('~~').length;
  },
  addLink(value) {
    const strValue = `( ${value} )`;

    if (!this.currentChain) {
      this.currentChain = strValue; 
      return this;
    }

    this.currentChain += `~~${strValue}`;
    return this;
  },
  removeLink(position) {
    if (!this.currentChain || Number.isNaN(+position) || !Number.isInteger(+position)) {
      this.currentChain = null;
      throw new Error(`You can't remove incorrect link!`);
    }
    const arr = this.currentChain.split('~~');

    if (!arr[+position] || (+position <= 0) || (+position >= arr.length)) {
      this.currentChain = null;
      throw new Error(`You can't remove incorrect link!`);
    }

    arr.splice(+position - 1, 1);
    this.currentChain = arr.join('~~');
    return this;
  },
  reverseChain() {
    if (!this.currentChain) {
      return this;
    }
    
    const arr = this.currentChain.split('~~');
    arr.reverse();
    this.currentChain = arr.join('~~');
    return this;
  },
  finishChain() {
    const result = this.currentChain;
    this.currentChain = null;
    return result;
  }
};

module.exports = {
  chainMaker
};
