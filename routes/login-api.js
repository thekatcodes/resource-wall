/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const { getUsersFromEmail, addUsers } = require('../db/queries/users');
const { hashPassword, comparePass } = require('../public/scripts/users-api');

const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  getUsersFromEmail(email)
    .then(jRes => {
      if (comparePass(password, jRes.password)) {
        req.session.email = email;
        res.json(jRes);
      } else {
        res.send("");
      }
    })
    .catch((err) => {
      res.send("");
    });
});

router.post('/account', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = hashPassword(req.body.password);
  addUsers(username, email, password)
    .then((res) => {
      req.session.user = req.body.email;
      console.log("redirect to main page with resources and headers loaded");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
