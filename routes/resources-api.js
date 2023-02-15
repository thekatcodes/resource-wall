const express = require('express');

const router = express.Router();
const client = require('../db/connection.js');
const getAllResources = require('../db/queries/getAllResources.js');
const { getUsersFromEmail ,userLike } = require('../db/queries/users');
const { addLiked, updateLiked } = require('../db/queries/submission');

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

module.exports = router;

