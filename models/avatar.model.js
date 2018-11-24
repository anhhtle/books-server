const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    quote: {type: String, required: true},
    quote_author: {type: String, required: true},
    lock: {type: String, required: true},
    unlocked: {type: String, required: true}
})

module.exports = mongoose.model('Avatar', avatarSchema);
