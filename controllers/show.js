const Entry = require('../model/entry');
const User = require('../model/user');

async function show (req, res){
    const entry = await Entry.findById(req.params.id);
    if(entry.objectIdReference != req.user.id){
        res.render('entry/readShow', { entry } );
    }else{
        res.render('entry/editShow', { entry } );    
    }
    
};


module.exports = {
    show,
}