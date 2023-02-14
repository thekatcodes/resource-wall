const pool = require('../connection.js');

const getAllResources = function() {
  return pool.query(`SELECT resources.id, title,
                  description,
                  cover_image_url,
                  users.name,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    GROUP BY resources.id, title, description, cover_image_url, users.name;`)
                      .then((result) => {
                        return result.rows;
                      })
                      .catch((err) => {
                        console.log(err.message)
                      });
};

const getResourceById = function(id) {
  console.log('hey')
  return pool.query(`SELECT resources.id, title,
                  description,
                  cover_image_url,
                  users.name,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    WHERE resources.id = $1
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id;`, [id])
                      .then((result) => {
                        return result.rows[0];
                      })
                      .catch((err) => {
                        console.log(err.message)
                      });
};


module.exports = { getAllResources, getResourceById};
