const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const requestSchema = mongoose.Schema({
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
    },
    original_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {type: String, default: 'Requesting'},
    hide_request: {type: Boolean, default: false},
    thanked_owner: {type: Boolean, default: false}
}, {timestamps: true} );

// soft delete with .delete() function
requestSchema.plugin(mongoose_delete, { deletedAt : true });
// router methods won't return soft deleted rows
requestSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('Request', requestSchema);
