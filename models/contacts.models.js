/**
 * File name: index.js
 * Name: Kunj Alkeshbhai Choksi
 * StudentId: 301200718
 * Date: 21 October, 2021
 */

// require modules for the Contact Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let Contacts = mongoose.Schema({
    name: String,
    number: Number,
    email: String
}, {
    collection: "contacts"
});

module.exports.Contacts = mongoose.model("Contacts", Contacts);