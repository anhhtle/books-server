const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {type: String , required: true},
    last_name: {type: String , required: true},
    email: {type: String, required: true},
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('User', userSchema);