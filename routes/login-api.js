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
        /* compares the password using bcrypt
         * assigns the user a email cookie with the value using their email
         * sends the user data to the document if the password and email matches
         */
        req.session.email = email;
        res.json(jRes);
      } else {
        res.send("");
      }
    });
});

router.post('/account', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = hashPassword(req.body.password);
  getUsersFromEmail(email)
    .then((dataRes) => {
      if (!dataRes) {
        addUsers(username, email, password)
          .then((jRes) => {
            // adds the user then sends user back to the document
            req.session.email = req.body.email;
            return res.json(jRes);
          });
      } else {
        res.send("");
      }
    });
});

module.exports = router;
