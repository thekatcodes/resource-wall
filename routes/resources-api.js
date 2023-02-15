const express = require("express");

const router = express.Router();
const client = require('../db/connection.js');
const { getUsersFromEmail ,userLike, userRating } = require('../db/queries/users');
const { addLiked, updateLiked, addResource, addTag, updateRating, addRating } = require('../db/queries/submission');
const { getAllResources , getResourceById, resourceAverageRating } = require("../db/queries/getAllResources.js");
const { serializeIntoObject } = require('../public/scripts/users-api');
const getCommentsForResource = require("../db/queries/comments");


router.use((req, res, next) => {
  console.log("inside the resources router");
  next();
});

// GET /
router.get("/", (req, res) => {
  getAllResources()
    .then((response) => {
      return res.json(response);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

router.get('/like', (req, res) => {
  userLike(req.session.user, req.query.resources)
    .then((likeData) => {
      if (!likeData) {
        return res.json({liked : false});
      }
      return res.json(likeData);
    })
    .catch((e) => {
      res.json({liked : false});
    });
});

router.post('/like', (req, res) => {
  userLike(req.session.user, req.body.info)
    .then((userLikeData) => updateLiked(userLikeData))
    .then((updatedLikes) => {
      return res.json(updatedLikes);
    })
    .catch((e) => {
      addLiked(req.body.info, req.session.user)
        .then((addedLike) => {
          return res.json(addedLike);
        })
        .catch((e) => {
          return res.send("");
        });
    });
});

router.post('/submission', (req, res) => {
  const info = serializeIntoObject(req.body.info);
  addResource(req.session.user, info.title, info.description, info.imageURL, info.externalURL)
    .then((dataRes) => addTag(dataRes.id, info.tags))
    .then((tagData) => {
      console.log(tagData);
      return res.json(tagData);
    })
    .catch((e) => {
      return res.send("");
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

router.get("/rating", (req, res) => {
  userRating(req.session.user, req.query.resource)
    .then((data) => {
      return res.json(data);
    })
    .catch((e) => {
      res.send('');
    })
});

router.post("/rating", (req, res) => {
  userRating(req.session.user, req.body.info)
    .then((userRatingData) => updateRating(req.body.rating, userRatingData.id))
    .then((ratingData) => resourceAverageRating(ratingData.resource_id))
    .then((data) => {
      return res.json(data);
    })
    .catch(() => {
      addRating(req.body.info, req.session.user, req.body.rating)
        .then((ratingData) => resourceAverageRating(ratingData.resource_id))
        .then((data) => {
          return res.json(data);
        })
        .catch((e) => {
          res.send("");
        });
    });
});

router.get("/:id", (req, res) => {
  const resourceId = req.params.id;
  getResourceById(resourceId)
    .then((response) => {
      return res.json(response);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
