/**
 * File name: app.js
 * Name: Kunj Alkeshbhai Choksi
 * StudentId: 301200718
 * Date: 29 September, 2021
 */
// imports for npm modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

// express app variable
var app = express();

// modules for authentication
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// loggers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);

//setup express session
app.use(session({
    secret: "SomeSecretKey",
    saveUninitialized: false,
    resave: false
}));

// initiate flash
app.use(flash());

//initiate passport
app.use(passport.initialize());

// database setup
let mongoose = require('mongoose');
let DB = require('./config/db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB...');
});

app.use(passport.session());

// passport user configuration


// create user User Model Instance
let userModel = require("./models/users.model");
let User = userModel.User;

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
