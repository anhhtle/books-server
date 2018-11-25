const mongoose = require('mongoose');

const newsfeedSchema = mongoose.Schema({
    type: {type: String, required: true},
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        default: null
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    community_member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    created_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Newsfeed', newsfeedSchema);