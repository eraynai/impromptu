var express = require('express');
var router = express.Router();
const passport = require('passport');

//home login

router.get('/', function(req, res){
  res.render('home');
})

//auth login
router.get('/auth/login', function(req, res, next) {
  res.render('login');
});

//auth with google
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'] }
  ));

//auth log out
router.get('/auth/logout', function(req, res){
  //handle with passport
  res.send('logging out with google');
});


//Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
  },
));
  
  
  module.exports = router;
  
  