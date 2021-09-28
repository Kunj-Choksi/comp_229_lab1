var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {});
});

router.get('/services', function (req, res, next) {
    res.render('landing/services', {});
});

router.get('/projects', function (req, res, next) {
    res.render('landing/projects', {});
});

module.exports = router;
