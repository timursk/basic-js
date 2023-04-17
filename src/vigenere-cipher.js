const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect) {
    if (isDirect === false) {
      this.isReverse = true;
    }
    else {
      this.isReverse = false;
    }
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.generateSquare();
  }
  encrypt(initMessage, initKey) {
    this.checkForArgs(initMessage, initKey);
    const [message, key] = this.updateMessageAndKey(initMessage, initKey);

    let encryptMessage = '';
    let diff = 0;

    for (let i = 0; i < message.length; i++) {
      const idx = this.alphabet.indexOf(message[i]);
      const keyIdx = this.alphabet.indexOf(key[i + diff]);

      if (idx === -1) {
        encryptMessage += message[i]
        diff -= 1;
        continue;
      }

      encryptMessage += (this.square[idx][keyIdx]);
    }
    
    if (this.isReverse) {
      encryptMessage = encryptMessage.split('').reverse().join('');
    }
    return encryptMessage;
  }
  decrypt(initMessage, initKey) {
    this.checkForArgs(initMessage, initKey);
    const [message, key] = this.updateMessageAndKey(initMessage, initKey);

    let decryptMessage = '';
    let diff = 0;

    for (let i = 0; i < message.length; i++) {
      const keyIdx = this.alphabet.indexOf(key[i + diff]);
      const idx = this.square[keyIdx].indexOf(message[i]);

      if (idx === -1) {
        decryptMessage += message[i];
        diff -= 1;
        continue;
      }
      decryptMessage += this.alphabet[idx];
    }

    if (this.isReverse) {
      decryptMessage = decryptMessage.split('').reverse().join('');
    }
    return decryptMessage;
  }
  generateSquare() {
    this.square = [];

    for (let i = 0; i < this.alphabet.length; i++) {
        let row = this.alphabet.slice(i);
        row += this.alphabet.slice(0, i);
        this.square.push(row);
    }
  }
  updateMessageAndKey(message, key) {
    while(key.length < message.length) {
      key += key;
    }
    if (key.length > message.length) {
      key = key.slice(0, message.length);
    }
    message = message.toUpperCase();
    key = key.toUpperCase();
    return [message, key];
  }
  checkForArgs(...args) {
    args.forEach((arg) => {
      if (!arg) {
        throw new Error('Incorrect arguments!');
      }
    });
  }
}

module.exports = {
  VigenereCipheringMachine
};
