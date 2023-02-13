const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');
const getAllResources = require('../db/queries/getAllResources.js')
const {
  createResourceElement,
  renderResources,
} = require ('../public/scripts/main-helpers.js')

router.use((req, res, next) => {
  // if (!req.session.userId) {
  //   return res.redirect('/login');
  // }
  console.log('inside the main page router');
  next();
});

// GET /
router.get('/', (req, res) => {
  getAllResources()
    .then((response) => {
      renderResources(response)
     // res.json(response.rows);

    });
});

module.exports = router;
