const Entry = require('../model/entry');

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
    newEntry.image.imageName = req.file.filename;
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
    await Entry.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, useFindAndModify: false });
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