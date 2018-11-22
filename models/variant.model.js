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
    status: {type: String, required: true},
    Progress: {type: Number, required: true},
    user_rating: {type: Number, required: true},
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book_condition: {type: String, required: true},
    available_for_share: {type: Boolean, required: true},
});

module.exports = mongoose.model('Variant', variantSchema);