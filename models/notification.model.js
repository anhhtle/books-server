const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
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
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar',
        default: null
    },
    admin: {type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('Notification', notificationSchema);
