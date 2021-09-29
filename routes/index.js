/**
 * File name: index.js
 * Name: Kunj Alkeshbhai Choksi
 * StudentId: 301200718
 * Date: 29 September, 2021
*/

/* npm module import */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: "home"});
});

/* GET services page */
router.get('/services', function (req, res, next) {
    res.render('landing/services', {title: "services"});
});

/* GET projects page */
router.get('/projects', function (req, res, next) {
    res.render('landing/projects', {title: "projects"});
});

/* GET about me page */
router.get('/about-me', function (req, res, next) {
    res.render('landing/about-me', {title: "about-me"});
});
/* GET contact me page */
router.get('/contact-me', function (req, res, next) {
    res.render('landing/contact-me', {title: "contact-me"});
});

module.exports = router;
