const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const friendRequestSchema = mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {type: String, default: 'Requesting'}
}, { timestamps: true, collection: 'friend-requests' } );

// soft delete with .delete() function
friendRequestSchema.plugin(mongoose_delete, { deletedAt : true });
// router methods won't return soft deleted rows
friendRequestSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
