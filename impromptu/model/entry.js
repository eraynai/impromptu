const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    date: { type: Date },
    title: { type: String, required: true },
    mood: { type: String, lowercase: true, enum: ['glad', 'sad', 'mad'] },
    entry: { type: String, required: true },
}, {
    timestamps: true,
});


const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;