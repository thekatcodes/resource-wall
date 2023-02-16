const pool = require("../connection.js");

const getAllResources = function () {
  return pool
    .query(
      `SELECT resources.id, title,
                  description,
                  cover_image_url,
                  created_date,
                  users.name,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    GROUP BY resources.id, title, description, cover_image_url, created_date, users.name;`
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
                  created_date,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    WHERE resources.id = $1
                    GROUP BY resources.id, title, description, cover_image_url, url, author, created_date`,
      [id]
    )
    .then((result) => {
      console.log(result.rows[0])
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const resourceAverageRating = (resourceID) => {
  const queryString = `
  SELECT ROUND(AVG(rating), 1) AS average_rating, resource_id
  FROM ratings
  WHERE resource_id = $1
  GROUP BY resource_id;
  `;
  return pool.query(queryString, [resourceID])
    .then((data) => {
      return data.rows[0];
    });
};

const getResourcesFromUserEmail =function (email) {
  return pool
    .query(
      `SELECT resources.id, title,
                  description,
                  cover_image_url,
                  users.name,
                  users.email,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    WHERE users.email = $1
                    GROUP BY resources.id, title, description, cover_image_url, users.name, users.email;`, [email]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getLikesFromUserid =function (id) {
  return pool
    .query(
      `SELECT resources.id, title,
                  description,
                  cover_image_url,
                  users.name,
                  users.email,
                  favourites.user_id AS favourties_user_id,
                  ROUND(AVG(ratings.rating), 1) AS rating,
                  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes
                    FROM resources
                    JOIN users ON users.id = owner_id
                    LEFT JOIN ratings ON resources.id = ratings.resource_id
                    LEFT JOIN favourites ON resources.id = favourites.resource_id
                    WHERE favourites.user_id = $1
                    GROUP BY resources.id, title, description, cover_image_url, users.name, users.email, favourties_user_id;`, [id]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getAllResources, getResourceById, getResourcesFromUserEmail, getLikesFromUserid, resourceAverageRating };

