const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    mood: { type: String, required: true },
    entry: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Entry', entrySchema);