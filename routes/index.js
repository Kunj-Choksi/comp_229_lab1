var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: "home"});
});

router.get('/services', function (req, res, next) {
    res.render('landing/services', {title: "services"});
});

router.get('/projects', function (req, res, next) {
    res.render('landing/projects', {title: "projects"});
});

router.get('/about-me', function (req, res, next) {
    res.render('landing/about-me', {title: "about-me"});
});

router.get('/contact-me', function (req, res, next) {
    res.render('landing/contact-me', {title: "contact-me"});
});

module.exports = router;
