const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entryTitleSchema = new Schema({
    title: [{type:Schema.Types.String, ref: 'Entry'}],
    mood: [{type:Schema.Types.String, ref: 'Entry'}],
}, {
    timestamps: true,
})

const EntryTitle = mongoose.model('EntryTitle', entryTitleSchema);

module.exports = EntryTitle;