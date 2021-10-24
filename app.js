/**
 * File name: app.js
 * Name: Kunj Alkeshbhai Choksi
 * StudentId: 301200718
 * Date: 29 September, 2021
 */
// imports for npm modules
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let contactsRouter = require("./routes/contacts.router");

// express app variable
var app = express();

// modules for authentication
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let LocalStrategy = passportLocal.Strategy;
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

// routes
app.use('/', indexRouter);
app.use("/contacts", contactsRouter);

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

// implement a User authentication Strategy
//passport.use(User.createStrategy());
passport.use("local", new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password === password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));


// serialize and deserialize the User info
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

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
