const pool = require('../connection.js');

const getAllResources = function() {
  return pool.query(`SELECT title,
                  description,
                  users.name,
                  ROUND(AVG(ratings.rating), 1),
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END)
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    GROUP BY title, description, users.name;`)
                      .then((result) => {
                        console.log(result);
                        console.log('hi')
                        return result.rows
                      })
                      .catch((err) => {
                        console.log(err.message)
                      });
};


module.exports = getAllResources;
