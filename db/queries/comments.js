const pool = require('../connection.js');

const getCommentsFromResource = function(id) {
  return pool.query(`SELECT comments.id as id,
                      resources.id as resource_id,
                      users.id as user_id,
                      users.name as user,
                      comments.message
    FROM comments
    JOIN resources ON resources.id = resource_id
    JOIN users ON users.id = user_id
    WHERE resources.id = $1`, [id])
                      .then((result) => {
                        console.log(result.rows)
                        return result.rows;
                      })
                      .catch((err) => {
                        console.log(err.message)
                      });
};

const addComment= (resourceID, userID, message) => {
  const queryString = `
  INSERT into comments (resource_id, user_id, message)
  VALUES ($1, $2, $3)
  RETURNING *;
  `
  return pool.query(queryString, [resourceID, userID, message])
    .then(data => {
      return data.rows[0];
    });
};


module.exports = { getCommentsFromResource, addComment };
