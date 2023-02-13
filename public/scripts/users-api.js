const bcrypt = require('bcrypt');
const salt = 12;

const serializeIntoObject = (string) => {
  let obj = {};
  const splitString = string.split('&');
  const seperateValues = splitString.map((string) => string.split('='));
  for (const keyPair of seperateValues) {
    obj[keyPair[0]] = decodeURIComponent(keyPair[1]);
    if (obj[keyPair[0]] === '') {
      obj[keyPair[0]] = null;
    }
  }
  return obj;
};

const hashPassword = function(password) {
  const hashedPass = bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePass = function(password, databasePass) {
  const compare = bcrypt.compareSync(password, databasePass);
  return compare;
};

module.exports = {hashPassword, comparePass, serializeIntoObject};