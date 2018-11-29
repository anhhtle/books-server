const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

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
    recieved_at: {type: Date, default: new Date()},
}, {timestamps: true});

// soft delete with .delete() function
variantSchema.plugin(mongoose_delete, { deletedAt : true });
// router methods won't return soft deleted rows
variantSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('Variant', variantSchema);