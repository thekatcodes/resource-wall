const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const searchQueries = require('../db/queries/search-queries');

// app.use(bodyParser.json());

router.use((req, res, next) => {
    console.log('inside the SEARCH router!');
    next();
  });

//GET 
router.get('/', (req, res) => {
    console.log('get request here');
    console.log(req.query);

    //req.query is passed as a parameter to getResources which retrieves the corresponding resources from the databse
    searchQueries.getResources(req.query.keyword)
    //Send resources back to the user as a response to the GET request
    .then(resources => console.log(resources))
    .catch(e => {
      console.error(e);
        res.send(e);
    }); 

});


module.exports = router;