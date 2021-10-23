let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create user model instance
let userModel = require("../models/users.model");
let User = userModel.User; // alias

module.exports.displayLoginPage = function (req, res, next) {
    // check if user is already logged in
    if (!req.user) {
        res.render("auth/login", {
            title: "Login",
            message: 'req.flash("loginMessage")',
            displayName: req.username
        })
    } else {
        return res.redirect("/");
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            return next(error);
        }
        // if there is a user login error
        if (!user) {
            // req.flash("loginMessage", "Authentication Error")
            return res.redirect("/login");
        }
        return res.redirect("/contacts");

    })(req, res, next);
}
