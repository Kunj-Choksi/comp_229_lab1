/**
 * File name: index.js
 * Name: Kunj Alkeshbhai Choksi
 * StudentId: 301200718
 * Date: 29 September, 2021
 */

/* npm module import */
let express = require('express');
const {route} = require("express/lib/router");
let router = express.Router();

let userController = require('../controllers/user.controller');

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

/* GET route for displaying the Login Page*/
router.get("/login", userController.displayLoginPage);

/* POST route for processing the Login Page*/
router.post("/login", userController.processLoginPage);

/* POST route for processing logout */
// router.get("/logout",);

module.exports = router;
