const express = require("express");

const router = express.Router();
const client = require('../db/connection.js');
const { getCommentsFromResource } = require("../db/queries/comments.js");
const { getUsersFromEmail } = require('../db/queries/users');

router.use((req, res, next) => {
  console.log("inside the comments router");
  console.log(req.session)
  next();
});

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  console.log(resourceId, 'test')
  getCommentsFromResource(resourceId)
    .then((response) => {
      return res.json(response)
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
});

router.post('/submission', (req, res) => {
  console.log(req.body.info)
  const info = serializeIntoObject(req.body.info);
  console.log('info', info)
  getUsersFromEmail(req.session.email)
    .then((data) => { console.log('daaata', data)})
    .catch((e) => {
      return res.send("");
    });
});

module.exports = router;
