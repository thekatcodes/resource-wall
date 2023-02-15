const pool = require("../connection.js");

const getAllResources = function () {
  return pool
    .query(
      `SELECT resources.id, title,
                  description,
                  cover_image_url,
                  users.name,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    GROUP BY resources.id, title, description, cover_image_url, users.name;`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getResourceById = function (id) {
  return pool
    .query(
      `SELECT resources.id, title,
                  description,
                  cover_image_url,
                  external_url AS url,
                  users.name AS author,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    WHERE resources.id = $1
                    GROUP BY resources.id, title, description, cover_image_url, url, author`,
      [id]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getAllResources, getResourceById };
