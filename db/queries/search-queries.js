const db = require("../connection");
const { Pool } = require("pg");
// Need to verify if above requirements are correct

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

//Get resources from searching a keyword
const getSearchResources = function (keyword) {
  //console.log(keyword); -> confirming keyword is being passed

  //Array to hold any parameters that may be available for the query
  const queryParams = [];

  //Start the query with all information that comes before the WHERE clause
  let queryString = `
  SELECT resources.id, title,
  description,
  cover_image_url,
  users.name,
  ROUND(AVG(ratings.rating), 1) AS rating,
  SUM(CASE WHEN favourites.liked THEN 1 ELSE 0 END) AS likes,
  tags.topic as tags
    FROM resources
    JOIN users ON users.id = owner_id
    LEFT JOIN ratings ON resources.id = ratings.resource_id
    LEFT JOIN favourites ON resources.id = favourites.resource_id
    LEFT JOIN tags ON resources.id = tags.resource_id `;

  //If keyword has been passed in, add the keyword to the queryParams array and create a WHERE clause for the keyword
  if (keyword) {
    queryParams.push(`%${keyword}%`);
    queryString += `WHERE tags.topic LIKE $${queryParams.length} `;
  }

  //Add any query that comes after the WHERE clause
  queryString += `
  GROUP BY resources.id, title, description, cover_image_url, users.name, tags;`;

  //Run the query
  return pool
    .query(queryString, queryParams)
    .then((result) => {
    //   console.log("this is query result.rows:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("error message:", err.message);
    });
};

exports.getSearchResources = getSearchResources;
