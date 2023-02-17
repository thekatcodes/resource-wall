const bcrypt = require('bcrypt');
const salt = 12;

// function that takes all the fields from a form and converts into an object
const serializeIntoObject = (string) => {
  let obj = {};
  const splitString = string.split('&');
  const seperateValues = splitString.map((string) => string.split('='));
  for (const keyPair of seperateValues) {
    // decodeURIcomponent is used to counteract the side effect from serialize
    // serialize changes special characters into numbers and symbols 
    obj[keyPair[0]] = decodeURIComponent(keyPair[1]);
    if (obj[keyPair[0]] === '') {
      obj[keyPair[0]] = null;
      // changes values to null if they are empty to prevent database from taking in empty values
      // sql empty values are not falsey valus therefore it needs to changed to null specifically
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