const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const notificationSchema = mongoose.Schema({
    type: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar',
        default: null
    },
    admin: {type: Boolean, default: false},
    new: {type: Boolean, default: true},
}, {timestamps: true});

// soft delete with .delete() function
notificationSchema.plugin(mongoose_delete, { deletedAt : true });
// router methods won't return soft deleted rows
notificationSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('Notification', notificationSchema);
