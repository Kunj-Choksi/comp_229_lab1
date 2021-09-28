var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/services', function(req, res, next) {
  res.render('landing/services', { title: 'Express' });
});

module.exports = router;
