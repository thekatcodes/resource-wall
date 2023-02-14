const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');
const getAllResources = require('../db/queries/getAllResources.js');


router.use((req, res, next) => {
  console.log('inside the resources router');
  next();
});

// GET /
router.get('/', (req, res) => {
  getAllResources()
    .then((response) => {
      console.log('hey')
      return res.json({response})})
    .catch(e => {
      console.error(e);
      res.send(e);
    })
});

// router.post('/submission', (req, res) => {
//   const info = serializeIntoObject(req.body.info);
//   getUsersFromEmail(req.session.email)
//     .then((data) => addResource(data.id, info.title, info.description, info.imageURL, info.externalURL))
//     .then((dataRes) => addTag(dataRes.id, info.tags))
//     .then((tagData) => {
//       console.log(tagData);
//       return res.json(tagData);
//     })
//     .catch((e) => {
//       return res.send("");
//     });


module.exports = router;

