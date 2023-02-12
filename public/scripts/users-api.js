const bcrypt = require('bcrypt');
const salt = 12;

const hashPassword = function(password) {
  const hashedPass = bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePass = function(password, databasePass) {
  const compare = bcrypt.compareSync(password, databasePass);
  return compare;
};

module.exports = {hashPassword, comparePass};