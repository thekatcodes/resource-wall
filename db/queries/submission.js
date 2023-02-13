const db = require('../connection');

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

module.exports = { addResource, addTag };