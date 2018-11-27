'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const passport = require('passport');
const auth = require('./auth');

const User = require('../models/user.model');
const Setting = require('../models/setting.model');

//*********** API ****************/

// GET all user
router.get('/', auth.optional, (req, res, next) => {
    User.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));
});


// Create new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
    const { body: { user } } = req;
  
    if(!user.email) {
        return res.status(422).json({error: 'email is required'});
    }
  
    if(!user.password) {
        return res.status(422).json({error: 'password is required'});
    }

    // check if user exists
    User.findOne({email: user.email})
        .then(user => {
            if (user) {
                return res.status(422).json({error: 'This email is already registered'});
            } 
        })

    const finalUser = new User(user);
    finalUser.createSetting();
    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => {
            res.status(201).json({ token: finalUser.toAuthJSON() })          
        });
});
  

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {

        if(err) {
            return res.status(500).json(err);
        }

        if(passportUser) {
            const user = passportUser;
            // user.token = passportUser.generateJWT();

            return res.status(200).json({token: user.toAuthJSON()});
        }

        return status(400).info;

    })(req, res, next);
});

// GET current user (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    User.findById(id)
        .populate(['avatar', 'setting'])
        .populate({
            path: 'friends',
            model: 'User',
            select: 'first_name last_name avatar',
            populate: {
                path: 'avatar',
                model: 'Avatar',
                select: 'image'
            }
        })
        .select('-salt -hash')
        .exec()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));
});

// Add friend
router.put('/current/friend', auth.required, (req, res, next) => {
    const { payload: { id }, body: {friend_id}  } = req;

    // add self to friend's list
    User.findByIdAndUpdate(friend_id, { "$push": { "friends": id } }, {new: true})
        .exec()
        .catch(err => res.status(500).json(err));

    // add friend to self's list
    User.findByIdAndUpdate(id, { "$push": { "friends": friend_id } }, {new: true})
        .exec()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json(err));

});

module.exports = router;