// const pool = require('../connection.js');

// const getCommentsForResource = function() {
//   return pool.query(`SELECT resources.id,
//                       user.id,
//                       comments.id,
//                       comments.text
//     FROM resources
//     JOIN users ON users.id = owner_id
//     JOIN comments ON resources.id = resource_id
//     WHERE resources.id = $1`, [id])
//                       .then((result) => {
//                         return result.rows;
//                       })
//                       .catch((err) => {
//                         console.log(err.message)
//                       });
// };

// module.exports = getCommentsForResource;
