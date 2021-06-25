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
    try {
        const newEntry = new Entry(req.body);
        newEntry.image.url = req.file.path;
        newEntry.image.imageName = req.file.filename;
        newEntry.objectIdReference = req.user.id;
        newEntry.author = req.user.name;
        await newEntry.save();
        res.redirect('/entries');
    } catch(err) {
        res.send('Your form is missing some information, be sure to fill out all the fields. Click back');
    } 
};
  
async function edit (req, res){
    const entry = await Entry.findById(req.params.id);
    res.render('entry/edit', { entry, categories });
};

async function update (req, res){
    try {
        const updatedEntry = await Entry.findById(req.params.id);
        updatedEntry.image.url = req.file.path;
        updatedEntry.image.filename = req.file.imageName;
        updatedEntry.date = req.body.date;
        updatedEntry.entry = req.body.entry;
        updatedEntry.title = req.body.title;
        updatedEntry.mood = req.body.mood;
        await updatedEntry.save();
        res.redirect('/entries');
    } catch(err) {
        res.send('Your form is missing some information, be sure to fill out all the fields. Click back');
    }
  };

async function deleteEntry (req, res){
    await Entry.findByIdAndDelete(req.params.id);
    res.redirect('/entries');
};

module.exports = {
    index,
    new: newElements,
    create,
    edit,
    update,
    delete: deleteEntry,
} 