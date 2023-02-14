const pool = require('../connection.js');

const getCommentsForResource = function(id) {
  return pool.query(`SELECT comments.id as id,
                      resources.id as resource_id,
                      users.id as user_id,
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

module.exports = getCommentsForResource;
