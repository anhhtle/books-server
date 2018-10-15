const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    google_id: String,
    title: {type: String , required: true},
    authors: [{type: String , required: true}], // array
    description: String,
    image: String,
    ratings: String,
});

module.exports = mongoose.model('Book', bookSchema);