const express = require('express');
const router  = express.Router();
const { addResource, addTag } = require('../db/queries/submission');
const { getUsersFromEmail } = require('../db/queries/users');

router.post('/submission', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const coverImageURL = req.body.coverImageURL;
  const externalURL = req.body.externalURL;
  const tags = req.body.tags;
  getUsersFromEmail(req.session.email)
    .then((data) => addResource(data.id, title, description, coverImageURL, externalURL))
    .then((dataRes) => addTag(dataRes.id, tags))
    .then((data) => res.json(data))
    .catch((e) => {
      res.send("error");
    });
});
