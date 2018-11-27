const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
    },
    setting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Setting'
    },
    hash: String,
    salt: String
}, {timestamps: true} );

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

userSchema.methods.createSetting = function() {
    const newSetting = new Setting();
    newSetting.save();
    this.setting = newSetting._id
}
  
userSchema.methods.toAuthJSON = function() {
    return this.generateJWT()
};

module.exports = mongoose.model('User', userSchema);