const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');
const getAllResources = require('../db/queries/getAllResources.js')
const renderResources = require ('../public/scripts/resources-helpers.js')

router.use((req, res, next) => {
  // if (!req.session.userId) {
  //   return res.redirect('/login');
  // }
  console.log('inside the resources router');
  next();
});

// GET /
router.get('/', (req, res) => {
  getAllResources()
    .then((response) => {
      console.log(response)
      res.send({response}) });
});


module.exports = router;

