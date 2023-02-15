const express = require("express");

const router = express.Router();
const client = require('../db/connection.js');
const { getUsersFromEmail ,userLike } = require('../db/queries/users');
const { addLiked, updateLiked } = require('../db/queries/submission');
const { getAllResources , getResourceById } = require("../db/queries/getAllResources.js");
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

router.get('/like', (req, res) => {
  getUsersFromEmail(req.session.email)
    .then((data) => userLike(data.id, req.query.resources))
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
  getUsersFromEmail(req.session.email)
    .then((data) => userLike(data.id, req.body.info))
    .then((userLikeData) => updateLiked(userLikeData))
    .then((updatedLikes) => {
      return res.json(updatedLikes);
    })
    .catch((e) => {
      getUsersFromEmail(req.session.email)
        .then((userData) => addLiked(req.body.info, userData.id))
        .then((addedLike) => {
          return res.json(addedLike);
        })
        .catch((e) => {
          return res.send("");
        })
    })

})

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
