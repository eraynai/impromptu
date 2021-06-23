var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const passport = require('passport');
var createError = require('http-errors');
const methodOverride = require('method-override');

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'Impromtu Rocks!',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Mount all routes with appropriate base paths
app.use('/profile', profileRouter);
app.use('/users', usersRouter);
app.use('/entries', entryRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
