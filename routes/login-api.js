/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const { getUsersFromEmail, addUsers, updateUserDetails } = require('../db/queries/users');
const { hashPassword, comparePass } = require('../public/scripts/users-api');
const { serializeIntoObject } = require('../public/scripts/users-api');


const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  let info = serializeIntoObject(req.body.info);
  getUsersFromEmail(info.email)
    .then(jRes => {
      if (jRes && comparePass(info.password, jRes.password)) {
        /* compares the password using bcrypt
         * assigns the user a email cookie with the value using their email
         * sends the user data to the document if the password and email matches
         */
        req.session.email = info.email;
        req.session.user = jRes.id;
        res.json(jRes);
      } else {
        res.send("");
      }
    })
    .catch((e) => res.send(""));
});

router.post('/account', (req, res) => {
  const info = serializeIntoObject(req.body.info);
  const password = hashPassword(info.password);
  getUsersFromEmail(info.email)
    .then((dataRes) => {
      if (!dataRes) {
        addUsers(info.username, info.email, password)
          .then((jRes) => {
            // adds the user then sends user back to the document
            req.session.email = info.email;
            req.session.user =  jRes.id;
            return res.json(jRes);
          });
      } else {
        res.send("");
      }
    });
});

router.post('/update', (req, res) => {
  const formData = serializeIntoObject(req.body.info);
  getUsersFromEmail(req.session.email)
    .then((data) => {
      if (comparePass(formData.password, data.password)) {
        return hashPassword(formData.newPassword);
      }
    })
    .then((hashedPassword) => {
      formData.newPassword = hashedPassword;
      return updateUserDetails(formData, req.session.user);
    })
    .then((data) => {
      console.log(data);
      return res.json(data);
    })
    .catch((e) => res.send(""));
});

module.exports = router;
