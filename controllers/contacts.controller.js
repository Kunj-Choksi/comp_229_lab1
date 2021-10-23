/**
 * File name: index.js
 * Name: Kunj Alkeshbhai Choksi
 * StudentId: 301200718
 * Date: 21 October, 2021
 */

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create contact model instance
let contacts = require("../models/contacts.models");
let Contacts = contacts.Contacts; // alias

module.exports = {
    getContacts: (req, res, next) => {
        Contacts.find((err, contactList) => {
            if (err) {
                return console.log(err)
            } else {
                res.render("main/contacts", {
                    title: "Contacts",
                    Contacts: contactList,
                })
            }
        })
    }
}