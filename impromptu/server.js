var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
require('dotenv').config()
const Entry = require('./model/entry');
const methodOverride = require('method-override');
const multer = require('multer');
const { storage } = require('./cloudinary');
console.log({ storage });
const upload = multer({ storage });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');


require('./config/database'); 


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Impromtu Rocks!',
  resave: false,
  saveUninitialized: true,
}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const categories = ['Glad', 'Sad', 'Mad'];

app.get('/posts', async function (req, res){
  const entries = await Entry.find({});
  res.render('posts/index', { entries });
})

app.get('/posts/newstuff', function (req, res){
  res.render('posts/new', { categories } )
});

app.post('/posts', upload.single('image'), async function (req, res){
  const newEntry = new Entry(req.body);
  newEntry.image.url = req.file.path;
  newEntry.image.imageName = req.file.filename;
  await newEntry.save();
  res.redirect('/posts');
})

/* app.post('/posts', upload.single('image'), function (req, res){
  console.log(req.body, req.file);
  res.send('it worked');
}); */

app.get('/posts/:id', async function (req, res){
  const entry = await Entry.findById(req.params.id);
  res.render('posts/show', { entry } );
})

app.get('/posts/:id/edit', async function (req, res){
  const entry = await Entry.findById(req.params.id);
  res.render('posts/edit', { entry, categories });
});

app.put('/posts/:id', async function (req, res){
  await Entry.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, useFindAndModify: false });
  res.redirect('/posts');
})

app.delete('/posts/:id', async function(req, res){
  await Entry.findByIdAndDelete(req.params.id);
  res.redirect('/posts');
})


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
