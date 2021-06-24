const mongoose = require('mongoose');
const Entry = require('./model/entry');
const EntryTitle = require('./model/entryTitle');

mongoose.connect('mongodb://localhost/diaryEntries', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;

db.on('connected', function () {
	console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

/* const d = new Entry({
    title: 'This is my first blog post',
    mood: 'sad',
    entry: 'This is just the beginning of something much bigger than myself',
}); */


/* const ent = new EntryTitle({
    title: d.title,
    mood: d.mood,
});

d.save().then(d => {
    console.log(d)
})
.catch(e => {
    console.log(e);
})

ent.save().then(ent => {
    console.log(ent)
})
.catch(e => {
    console.log(e)
}) */

const seedEntries = [
    {
        title: 'This is my first blog post',
        mood: 'sad',
        entry: 'This is just the beginning of something much bigger than myself',
    },
    {
        title: 'This is my second blog post',
        mood: 'sad',
        entry: 'This is just the beginning of something much bigger than myself',
    },
    {
        title: 'This is my third blog post',
        mood: 'sad',
        entry: 'This is just the beginning of something much bigger than myself',
    }
]

Entry.insertMany(seedEntries).then(res => {
    console.log(res)})
    .catch(e => {
        console.log(e);
    })