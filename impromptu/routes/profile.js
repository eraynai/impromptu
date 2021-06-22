var express = require('express');
var router = express.Router();

/* const authCheck = function (req, res, next){
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
} */

router.get('/', function(req, res){
    res.render('profile', { user: req.user });
})

module.exports = router;