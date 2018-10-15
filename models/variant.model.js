const mongoose = require('mongoose');

const variantSchema = mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    available_for_share: {type: Boolean, required: true},
});

module.exports = mongoose.model('Variant', variantSchema);