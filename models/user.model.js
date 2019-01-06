const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose_delete = require('mongoose-delete');

const Setting = require('./setting.model');

const userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    alias: {type: String, default: null},
    job: {type: String, default: null},
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar',
        default: '86660871101f2c0e771df8f8'
    },
    avatars_unlocked: {
        type: [String], 
        default: ["86660871101f2c0e771df8f8", "c367851d914237495b576e01", "f26923e2fa2a74a4ff8a6063"]
    },
    friends: [{ 
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    address: {
        street: {type: String, default: null},
        city: {type: String, default: null},
        state: {type: String, default: null},
        zipcode: {type: String, default: null},
        country: {type: String, default: null},
        additional_info: {type: String, default: null}
    },
    bookmarks: {
        silver: {type: Number, default: 2},
        gold: {type: Number, default: 0}
    },
    setting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Setting'
    },
    admin: {type: Boolean, default: false},
    hash: String,
    salt: String
}, {timestamps: true} );

// soft delete with .delete() function
userSchema.plugin(mongoose_delete, { deletedAt : true });
// router methods won't return soft deleted rows
userSchema.plugin(mongoose_delete, { overrideMethods: true });

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
  
userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};
  
userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

// create setting for a new user
userSchema.methods.createSetting = function() {
    const newSetting = new Setting();
    newSetting.save();
    this.setting = newSetting._id
}
  
// delete all of the user's book
userSchema.methods.deleteVariants = function() {
    
}

userSchema.methods.toAuthJSON = function() {
    return this.generateJWT()
};

module.exports = mongoose.model('User', userSchema);