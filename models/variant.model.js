const mongoose = require('mongoose');

const variantSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    status: {type: String, default: 'Not started'},
    Progress: {type: Number, default: 0},
    user_rating: {type: Number, default: null},
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    book_condition: {type: String, default: null},
    available_for_share: {type: Boolean, default: false},
});

module.exports = mongoose.model('Variant', variantSchema);