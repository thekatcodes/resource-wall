const express = require("express");

const router = express.Router();
const client = require('../db/connection.js');
const { getCommentsFromResource, addComment } = require("../db/queries/comments.js");
const { getUsersFromEmail } = require('../db/queries/users');
const { serializeIntoObject } = require('../public/scripts/users-api');


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
  const info = serializeIntoObject(req.body.info.formData)
  const resourceId = req.body.info.resourceID
  getUsersFromEmail(req.session.email)
    .then((data) => {
      return addComment(resourceId, data.id, info.message)})
    .then((result) => {
      return res.json(result);
    })
    .catch((e) => {
      return res.send("");
    });
});

module.exports = router;
