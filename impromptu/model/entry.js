const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    date: { type: Date },
    title: { type: String, required: true },
    mood: { type: String,  enum: ['Glad', 'Sad', 'Mad'] },
    entry: { type: String, required: true },
    image: {
        url: String,
        filename: String,
    },
/*     userId: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
 */ userId: String ,
}, {
    timestamps: true,
});


const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;