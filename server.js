var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const passport = require('passport');
var createError = require('http-errors');
const methodOverride = require('method-override');
const flash = require('req-flash');

// load the env vars
require('dotenv').config();

// create the express app
var app = express();

// Connect to MongoDB with mongoose 
require('./config/database'); 
require('./config/passport');

// Require our routes

var profileRouter = require('./routes/profile');
var usersRouter = require('./routes/users');
const entryRouter = require('./routes/entry');
const authRouter = require('./routes/auth');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Mount all routes with appropriate base paths
app.use('/profile', profileRouter);
app.use('/users', usersRouter);
app.use('/entries', entryRouter);
app.use('/', authRouter);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;