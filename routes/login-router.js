const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');
const { getUsersFromEmail, addUsers } = require('../db/queries/users');

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

router.post('/', (req, res) => {
  const email = req.body.email;
  getUsersFromEmail(email)
    .then((res) => {
      if (res.password === req.body.password) {
        console.log("redirect to main page with resources and headers loaded");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
