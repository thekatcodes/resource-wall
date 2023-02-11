const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');

router.use((req, res, next) => {
  // if (!req.session.userId) {
  //   return res.redirect('/login');
  // }
  console.log('inside the login router');
  next();
});

// GET /
router.get('/', (req, res) => {
  res.send('<h1>This is the login page<h1>')
});

module.exports = router;
