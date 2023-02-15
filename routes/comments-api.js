const express = require("express");

const router = express.Router();
const getCommentsForResource = require("../db/queries/comments.js");

router.use((req, res, next) => {
  console.log("inside the comments router");
  next();
});

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  console.log('test')
  getCommentsForResource(resourceId)
    .then((response) => {
      return res.json(response)
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
});

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
