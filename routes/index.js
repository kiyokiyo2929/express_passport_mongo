var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page_name:"top"});
});

router.get('/login', function(req, res, next) {
  res.redirect("/admin")
});

module.exports = router;
