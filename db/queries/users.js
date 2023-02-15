const db = require('../connection');
const { hashPassword } = require('../../public/scripts/users-api');

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
  INSERT into users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return db.query(queryString, [name, email, password])
    .then(data => {
      return data.rows[0];
    });
};

const updateUserDetails = (options, id) => {
  let queryParams = [];
  let queryString = `
  UPDATE users
  SET `;

  if (options.email) {
    queryParams.push(`${options.email}`);
    queryString += `email = $${queryParams.length} `;
  }

  if (options.username) {
    queryParams.push(`${options.username}`);
    queryString += `name = $${queryParams.length} `;
  }
  
  if (options.newPassword) {
    queryParams.push(`${hashPassword(options.newPassword)}`);
    queryString += `password = $${queryParams.length} `;
  }

  queryString += `WHERE id = ${id} RETURNING *;`;

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows[0];
    });
};

const userLike = (userID, post) => {
  const queryString = `
  SELECT liked, id FROM favourites
  WHERE user_id = $1 AND resource_id = $2
  `;

  return db.query(queryString, [userID, post])
    .then((data) => {
      return data.rows[0];
    });
};


module.exports = { getUsersFromEmail, addUsers, updateUserDetails, userLike };

