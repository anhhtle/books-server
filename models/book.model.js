const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    google_id: String,
    title: {type: String , required: true},
    authors: [{type: String , required: true}],
    description: {type: String, default: null},
    image: {type: String, default: null},
    ratings: {type: Number, default: null},
    variants: [{
        type: Schema.Types.ObjectId,
        ref: 'Variant'
    }],
});

module.exports = mongoose.model('Book', bookSchema);