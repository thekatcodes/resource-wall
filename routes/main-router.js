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
  client.query('SELECT * FROM resources;')
    .then((response) => {
      res.json(response.rows);

    });
});

module.exports = router;
