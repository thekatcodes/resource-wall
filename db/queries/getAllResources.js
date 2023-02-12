const client = require('../connection.js');

const getAllResources = function() {
  console.log('hi');
  const allUsers = client.query(`SELECT title,
                  description,
                  users.name,
                  ROUND(AVG(ratings.rating), 1)
                    FROM resources
                    JOIN users ON users.id = owner_id
                    JOIN ratings ON resources.id = ratings.resource_id
                    JOIN favourites ON resources.id = favourites.resource_id
                    GROUP BY title, description, users.name;`)
  return allUsers;
}

module.exports = getAllResources;
