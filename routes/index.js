var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
    layout: false
  }
  
  res.render('index', data);
});

module.exports = router;