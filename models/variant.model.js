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
    progress: {type: Number, default: 0},
    user_rating: {type: Number, default: null},
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    book_condition: {type: String, default: null},
    available_for_share: {type: Boolean, default: false},
    share_requested: {type: Boolean, default: false},
    created_at: {type: Date, default: new Date()},
    recieved_at: {type: Date, default: new Date()},
});

module.exports = mongoose.model('Variant', variantSchema);