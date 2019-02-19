const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const settingSchema = mongoose.Schema({
    push_notifications: {
        book_requests: {type: Boolean, default: true},
        friend_requests: {type: Boolean, default: true},
        book_recommendations: {type: Boolean, default: true}
    },
    email_notifications: {
        friend_requests: {type: Boolean, default: true},
        book_requests: {type: Boolean, default: true},
        news: {type: Boolean, default: true}
    }
}, {timestamps: true} );

// soft delete with .delete() function
settingSchema.plugin(mongoose_delete, { deletedAt : true });

module.exports = mongoose.model('Setting', settingSchema);
