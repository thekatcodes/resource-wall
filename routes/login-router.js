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
router.get('/logout', (req, res) => {
  req.session.email = null;
  req.session.user = null;
  res.send("logout");
});

// GET login status 
router.get('/loginStatus', (req, res) => {
    res.send(req.session.email);
  });

module.exports = router;

