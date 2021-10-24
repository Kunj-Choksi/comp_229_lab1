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

router.get("/edit/:id", contactsController.displayEditContactPage);

router.post("/edit/:id", contactsController.processEditContactPage);

router.get("/delete/:id", contactsController.deleteContactPage);

module.exports = router;