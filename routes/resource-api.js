const express = require('express');
const router  = express.Router();
const { addResource, addTag } = require('../db/queries/submission');
const { getUsersFromEmail } = require('../db/queries/users');
const { serializeIntoObject } = require('../public/scripts/users-api');


router.post('/submission', (req, res) => {
  const info = serializeIntoObject(req.body.info);
  getUsersFromEmail(req.session.email)
    .then((data) => addResource(data.id, info.title, info.description, info.imageURL, info.externalURL))
    .then((dataRes) => addTag(dataRes.id, info.tags))
    .then((tagData) => {
      console.log(tagData);
      return res.json(tagData);
    })
    .catch((e) => {
      return res.send("");
    });
});


module.exports = router;
