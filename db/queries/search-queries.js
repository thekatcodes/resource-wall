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
const getResources = function (keyword) {
  //Array to hold any parameters that may be available for the query
  const queryParams = [];

  //Start the query with all information that comes before the WHERE clause
  let queryString = `
    SELECT resources.id as resource_id, tags.topic as tags
    FROM tags
    JOIN resources ON resources.id = resource_id `;

  //If keyword has been passed in, add the keyword to the queryParams array and create a WHERE clause for the keyword
  if (keyword) {
    queryParams.push(`%${keyword}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  //Add any query that comes after the WHERE clause
  queryString += `
    GROUP BY resources.id, tags.topic
    ORDER BY resource_id;`;

  //Run the query
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getResources = getResources;