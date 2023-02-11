const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');

router.use((req, res, next) => {
  // if (!req.session.userId) {
  //   return res.redirect('/login');
  // }
  console.log('inside the main page router');
  next();
});

// GET /
router.get('/', (req, res) => {
  client.query(`SELECT title,
                  description,
                  users.name,
                  ROUND(AVG(ratings.rating), 1)
                    FROM resources
                    JOIN users ON users.id = owner_id
                    JOIN ratings ON resources.id = ratings.resource_id
                    GROUP BY title, description, users.name;`)
    .then((response) => {
      res.json(response.rows);

    });
});

module.exports = router;
