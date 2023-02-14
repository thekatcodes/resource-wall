const express = require("express");

const router = express.Router();
const client = require("../db/connection.js");
const getAllResources = require("../db/queries/getAllResources.js");

router.use((req, res, next) => {
  console.log("inside the resources router");
  next();
});

// GET /
router.get("/", (req, res) => {
  getAllResources()
    .then((response) => {
      console.log("hey");
      return res.json({ response });
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// GET /resources for search queries
router.get("/resources", (req, res) => {
  database
    .getSearchResources(req.query)
    .then((resources) => res.send({ resources }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
