const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    google_id: String,
    title: {type: String , required: true},
    authors: [{type: String , required: true}],
    categories: [{type: String, default: null}],
    description: {type: String, default: null},
    image: {type: String, default: null},
    ratings: {type: Number, default: null},
    industryIdentifiers: { type : Array , default: null }
}, {timestamps: true} );

module.exports = mongoose.model('Book', bookSchema);