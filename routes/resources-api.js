const express = require("express");

const router = express.Router();
const client = require('../db/connection.js');

const { getUsersFromEmail ,userLike, userRating } = require('../db/queries/users');
const { addLiked, updateLiked, addResource, addTags, updateRating, addRating } = require('../db/queries/submission');
const { getAllResources , getResourceById, getResourcesFromUserEmail, getLikesFromUserid, resourceAverageRating } = require("../db/queries/getAllResources.js");

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

router.get("/user", (req, res) => {
  const userId = req.session.email;
  console.log(userId)
  getResourcesFromUserEmail(userId)
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
  // finds if the user has liked the post and updates
  // or creates a new like post if it does not find any history of user liking the post
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

router.get('/user/likes', (req, res) => {
  getUsersFromEmail(req.session.email)
    .then((data) => getLikesFromUserid(data.id))
    .then((response) => {
      console.log('likes', response)
      return res.json(response);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

router.post('/submission', (req, res) => {
  const info = serializeIntoObject(req.body.info);
  addResource(req.session.user, info.title, info.description, info.imageURL, info.externalURL)
  // adds tags seperately as it is a seperate table
    .then((dataRes) => addTags(dataRes.id, info.tags))
    .then((tagData) => {
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
  // gets user history of liking post or sends falsey value
  userRating(req.session.user, req.query.resource)
    .then((data) => {
      return res.json(data);
    })
    .catch((e) => {
      res.send('');
    })
});

router.post("/rating", (req, res) => {
  // updates previous user rating of the resource
  // or creates a new user rating post in the ratings table
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
