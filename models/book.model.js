const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    google_id: String,
    title: {type: String , required: true},
    authors: [{type: String , required: true}], // array
    image: String,
    ratings: String,
    available_for_share: {type: Boolean, required: true},
});

module.exports = mongoose.model('Book', bookSchema);