var express = require('express');
var router = express.Router();
const passport = require('passport');

//home login

router.get('/', function(req, res){
  console.log('this is req user', req.user);
  res.render('home');
})

//auth login
router.get('/auth/login', function(req, res, next) {
  console.log('this is req user', req.user);
  res.render('login');
  console.log('this is req.user', req.user);
});

//auth with google
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'] }
  ));

//auth log out
router.get('/auth/logout', function(req, res){
  //handle with passport
  console.log('this is req user', req.user);
  req.logout();
  res.redirect('/');
});


//Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/profile',
    failureRedirect: '/profile',
  },
));
  
  
  module.exports = router;
  
  