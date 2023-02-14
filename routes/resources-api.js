const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');
const { getAllResources, getResourceById } = require('../db/queries/getAllResources.js');
const getCommentsForResource = require('../db/queries/comments');



router.use((req, res, next) => {
  console.log('inside the resources router');
  next();
});

// GET /
router.get('/', (req, res) => {
  getAllResources()
    .then((response) => {
      return res.json(response)})
    .catch(e => {
      console.error(e);
      res.send(e);
    })
});

router.get('/:id', (req, res) => {
  console.log('test')
  const resourceId = req.params.id;
  getResourceById(resourceId)
    .then((response) => {
      console.log('hey')
      return res.json(response)
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
});


module.exports = router;

