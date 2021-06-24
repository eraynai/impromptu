const Entry = require('../model/entry');
const User = require('../model/user');

async function show (req, res){
    const entry = await Entry.findById(req.params.id);
    console.log('this is the entry',entry);
    console.log('this is the req use id outside', req.user.id);
    console.log('this is the entry.objectIdReference outside', entry.objectIdReference);
    if(entry.objectIdReference != req.user.id){
        console.log('this is the req use id inside', req.user.id);
        console.log('this is the entry.objectIdReference inside', entry.objectIdReference);
        console.log('are you seeing this')
        res.render('entry/readShow', { entry } );
    }else{
        res.render('entry/editShow', { entry } );    
    }
    
};


module.exports = {
    show,
}