const express = require("express");

const router = express.Router();
const getCommentsForResource = require("../db/queries/comments.js");

router.use((req, res, next) => {
  console.log("inside the comments router");
  next();
});

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  getCommentsForResource(resourceId)
    .then((response) => {
      return res.json(response)
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
});


module.exports = router;
