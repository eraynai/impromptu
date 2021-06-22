const Entry = require('../model/entry');
const User = require('../model/user');

const categories = ['Glad', 'Sad', 'Mad'];

async function index (req, res){
    const entries = await Entry.find({});
    res.render('entry/index', { entries });
};

function newElements (req, res){
    res.render('entry/new', { categories } )
  };

async function create (req, res){
    const newEntry = new Entry(req.body);
    newEntry.image.url = req.file.path;
    newEntry.image.filename = req.file.imageName;
    const userQuery = await User.find({});
    console.log( userQuery[0].googleId );
    await newEntry.save();
    res.redirect('/entries'); 
};

async function show (req, res){
    const entry = await Entry.findById(req.params.id);
    res.render('entry/show', { entry } );
};

  

async function edit (req, res){
    const entry = await Entry.findById(req.params.id);
    res.render('entry/edit', { entry, categories });
};

async function update (req, res){
    const updatedEntry = await Entry.findById(req.params.id);
    updatedEntry.image.url = req.file.path;
    updatedEntry.image.filename = req.file.imageName;
    updatedEntry.entry = req.body.entry;
    updatedEntry.title = req.body.title;
    updatedEntry.mood = req.body.mood;
    await updatedEntry.save();
    res.redirect('/entries');
  };

async function deleteEntry (req, res){
    await Entry.findByIdAndDelete(req.params.id);
    res.redirect('/entries');
};

module.exports = {
    index,
    new: newElements,
    create,
    show,
    edit,
    update,
    delete: deleteEntry,
} 