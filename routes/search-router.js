const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const searchQueries = require('../db/queries/search-queries');

app.use(bodyParser.json());


//GET 
router.get('/search', (req, res) => {
    console.log('get request here');
    console.log(req.query);

    searchQueries.getResources(req.query)
    .then(resources => res.send({resources}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 

});


module.exports = router;