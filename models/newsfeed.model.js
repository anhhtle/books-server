const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const newsfeedSchema = mongoose.Schema({
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
    community_member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar',
        default: null
    },
} , {timestamps: true});

// soft delete with .delete() function
newsfeedSchema.plugin(mongoose_delete, { deletedAt : true });
// router methods won't return soft deleted rows
newsfeedSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('Newsfeed', newsfeedSchema);
