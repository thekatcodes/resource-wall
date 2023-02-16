const db = require('../connection');
const { hashPassword } = require('../../public/scripts/users-api');

// function for finding userID from user table from emails incase cookie is not set
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

// registration db query
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

/* Updates the the user table with the according user id with
 * new values for emails, password, username as long as they are not null
 * if all are null then this will return error
 */ 
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
    queryParams.push(`${options.newPassword}`);
    queryString += `password = $${queryParams.length} `;
  }

  queryString += `WHERE id = ${id} RETURNING *;`;

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows[0];
    });
};

// gets user like value to display on resource wall
const userLike = (userID, post) => {
  const queryString = `
  SELECT liked, id FROM favourites
  WHERE user_id = $1 AND resource_id = $2;
  `;

  return db.query(queryString, [userID, post])
    .then((data) => {
      return data.rows[0];
    });
};

// gets user rating to display on resources page
const userRating = (userID, post) => {
  const queryString = `
  SELECT id, rating FROM ratings
  WHERE user_id = $1 AND resource_id = $2;
  `;

  return db.query(queryString, [userID, post])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getUsersFromEmail, addUsers, updateUserDetails, userLike, userRating };

