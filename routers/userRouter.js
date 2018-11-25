'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const passport = require('passport');
const auth = require('./auth');

const User = require('../models/user.model');

//*********** API ****************/

// GET all user
router.get('/', auth.optional, (req, res, next) => {
    User.find()
        .populate('avatar')
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));
});


//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
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
  
    const finalUser = new User(user);
  
    finalUser.setPassword(user.password);
  
    return finalUser.save()
        .then(() => res.json({ token: finalUser.toAuthJSON() }));
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

    const updateObj = {last_signed_in: new Date()}

    User.findOneAndUpdate({_id: id}, updateObj, {new: true})
        .populate('avatar')
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
        .exec()
        .then(user => {
            res.status(200).json({user, token: user.toAuthJSON()});
        })
        .catch(err => res.status(500).json(err));
});

// Add friend
router.put('/current/friend', auth.required, (req, res, next) => {
    const { payload: { id }, body: {friend_id}  } = req;

    User.findByIdAndUpdate(id, { "$push": { "friends": friend_id } }, {new: true})
        .exec()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json(err));

});

module.exports = router;