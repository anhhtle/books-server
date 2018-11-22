const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {type: String , required: true},
    last_name: {type: String , required: true},
    email: {type: String, required: true},
    alias: {type: String, default: null},
    job: {type: String, default: null},
    address: {
        street: {type: String, default: null},
        city: {type: String, default: null},
        state: {type: String, default: null},
        zipcode: {type: String, default: null},
        country: {type: String, default: null},
    }
});

module.exports = mongoose.model('User', userSchema);