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
    // GET contact list API
    getContacts: (req, res, next) => {
        Contacts.find((err, contactList) => {
            if (err) {
                return console.log(err)
            } else {
                contactList.sort((a, b) => {
                    return a.name > b.name;
                })
                res.render("main/contacts", {
                    title: "Contacts",
                    Contacts: contactList,
                    showLogin: false
                })
            }
        })
    },
    // GET for edit contact page
    displayEditContactPage: (req, res, next) => {
        let id = req.params.id;
        Contacts.findById(id, (err, contactToEdit) => {
            if (err) {
                console.error(err);
                res.end(err);
            } else {
                return res.render("main/edit-contact", {
                    title: "Edit Contacts",
                    Contact: contactToEdit,
                    showLogin: false
                })
            }
        })
    },
    // POST process edit contact page
    processEditContactPage: (req, res, next) => {
        let id = req.params.id;

        let contactToBeUpdated = {
            "_id": id,
            "name": req.body.name,
            "number": req.body.number,
            "email": req.body.email
        }

        Contacts.updateOne({_id: id}, contactToBeUpdated, (err, contactToEdit) => {
            if (err) {
                return console.error(err);
            } else {
                res.redirect("/contacts")
            }
        })
    },
    // GET for delete contact by ID
    deleteContactPage: (req, res, next) => {
        let id = req.params.id;

        Contacts.remove({_id: id}, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                // refresh the contacts list
                res.redirect('/contacts');
            }
        })
    }
}