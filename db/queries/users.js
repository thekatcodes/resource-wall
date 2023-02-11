const db = require('../connection');

const getUsersFromEmail = (email) => {
  const queryString = `
  SELECT * FROM users
  WHERE email = $1;
  `;
  return db.query(queryString, [email])
    .then(data => {
      return data.rows[0];
    });
};

const addUsers = (name, email, password) => {
  const queryString = `
  INSERT into users
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return db.query(queryString, [name, email, password])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { getUsersFromEmail, addUsers };

