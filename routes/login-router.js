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
  res.render('../views/index.ejs');
});

module.exports = router;

