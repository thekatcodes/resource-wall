const db = require('../connection');

//query for adding new resources
const addResource = (ownerID, title, description, coverImageURL, externalURL) => {
  const queryString = `
  INSERT into resources (owner_id, title, description, cover_image_url, external_url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `
  return db.query(queryString, [ownerID, title, description, coverImageURL, externalURL])
    .then(data => {
      return data.rows[0];
    });
};

//query for adding tags to resources
const addTag = (resourceID, tag) => {
  const queryString = `
  INSERT into tags (resource_id, topic)
  VALUES ($1, $2)
  RETURNING *;
  `;
  return db.query(queryString, [resourceID, tag])
    .then((data) => {
      return data.rows[0];
    });
};

// adds a like associated with a resource_id and user_id
const addLiked = (resourceID, userID) => {
  const queryString = `
  INSERT into favourites (resource_id, user_id, liked)
  VALUES ($1, $2, true)
  RETURNING *;
  `;
  return db.query(queryString, [resourceID, userID])
    .then((data) => {
      return data.rows[0];
    });
};

// changes the boolean liked in like table to opposite value
const updateLiked = (likeObject) => {
  let queryString = `UPDATE favourites `;
  if (likeObject.liked) {
    queryString += `SET liked = false `;
  } else {
    queryString += `SET liked = true `;
  }
  queryString += `WHERE id = $1 RETURNING *;`;

  return db.query(queryString, [likeObject.id])
    .then((data) => {
      return data.rows[0];
    });
};

// adds a new rating assocaited with resourceID and userID if they do not have a previous rating
const addRating = (resourceID, userID, rating) => {
  const queryString = `
  INSERT into ratings (resource_id, user_id, rating)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  return db.query(queryString, [resourceID, userID, rating])
    .then((data) => {
      return data.rows[0];
    });
};

// updates new rating
const updateRating = (newRating, ratingID) => {
  const queryString = `
  UPDATE ratings
  SET rating = $1
  WHERE id = $2
  RETURNING *;
  `;
  return db.query(queryString, [newRating, ratingID])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { addResource, addTag, addLiked, updateLiked, addRating, updateRating };