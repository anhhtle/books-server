const mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
    push_notifications: {
        book_requests: {type: Boolean, default: true},
        friend_requests: {type: Boolean, default: true},
        book_recommendations: {type: Boolean, default: true}
    },
    email_notifications: {
        book_requests: {type: Boolean, default: true},
        news: {type: Boolean, default: true}
    }
});

module.exports = mongoose.model('Setting', settingSchema);
