const pool = require('../connection.js');

const getAllResources = function() {
  console.log('test')
  return pool.query(`SELECT resources.id, title,
                  description,
                  cover_image_url,
                  users.name,
                  ROUND(AVG(ratings.rating), 1),
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END)
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    GROUP BY resources.id, title, description, cover_image_url, users.name;`)
                      .then((result) => {
                        console.log(result);
                        return result.rows
                      })
                      .catch((err) => {
                        console.log(err.message)
                      });
};


module.exports = getAllResources;
