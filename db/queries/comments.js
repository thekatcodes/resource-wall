const pool = require('../connection.js');

const getCommentsForResource = function() {
  return pool.query(`SELECT comments.id AS id,
                      message,
                      users.name AS name,
                      users.id,
                      resource.id,
                      FROM comments
                        JOIN users ON users.id = user_id
                        JOIN resources ON resources.id = resource_id
                  `)
                      .then((result) => {
                        return result.rows;
                      })
                      .catch((err) => {
                        console.log(err.message)
                      });
};

module.exports = getCommentsForResource;
