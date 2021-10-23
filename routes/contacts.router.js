/**
 * File name: index.js
 * Name: Kunj Alkeshbhai Choksi
 * StudentId: 301200718
 * Date: 21 October, 2021
 */

/* npm module import */
let express = require('express');
let router = express.Router();

let contactsController = require("../controllers/contacts.controller");

/* GET for contacts page */
router.get("/", contactsController.getContacts);

module.exports = router;