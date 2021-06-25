var express = require('express');
var router = express.Router();
const Entry = require('../model/entry');

const authCh = function (req, res, next){
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
}

router.get('/', authCh, async function(req, res){
    const entry = await Entry.find({ objectIdReference: req.user.id});
    res.render('profile', { user: req.user, entry });
})

module.exports = router;