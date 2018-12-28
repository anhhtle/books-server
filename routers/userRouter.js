'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const passport = require('passport');
const auth = require('./auth');

const User = require('../models/user.model');
const Variant = require('../models/variant.model');
const Setting = require('../models/setting.model');
const Newsfeed = require('../models/newsfeed.model');
const Notification = require('../models/notification.model');
const Request = require('../models/request.model');
const FriendRequest = require('../models/friendRequest.model');

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

// DELETE current user
router.delete('/current', auth.required, (req, res) => {
    const { payload: { id } } = req;

    User.findById(id)
        .then(user => {

            // res.status(200).json(user);

            // delete user's setting relation
            // let setting = Setting;
            // setting.deleteById(user.setting).exec();

            // delete all of user's variants
            // let variants = Variant;
            // variants.delete({user: id}).exec();

            // delete newsfeeds from user
            // let newsfeeds = Newsfeed;
            // newsfeeds.delete({
            //     $or: [
            //         {friend: id},
            //         {community_member: id}
            //     ]
            // }).exec();

            // delete notifications from user
            // let notifications = Notification;
            // notifications.delete({
            //     $or: [
            //         {user: id},
            //         {friend: id}
            //     ]
            // }).exec();

            // delete book requests
            // let requests = Request;
            // requests.delete({
            //     $or: [
            //         {original_owner: id},
            //         {requester: id}
            //     ]
            // }).exec();

            Request.find({
                    $or: [ 
                        {original_owner: id},
                        {requester: id},
                    ],
                })
                .then((requests) => {
                    // res.status(200).json(requests) 
                    requests.map(req => {
                        req.delete();
                    })
                })
                .then(() => res.status(200).json('OK!'));
            

            // user.delete()
            //     .then(deletedUser => {
            //         res.status(200).json(deletedUser) 
            //     });
        })
        .catch(err => res.status(500).json(err));
});

// find user
router.post('/search', auth.optional, (req, res) => {
    const { payload: {id}, body: { query } } = req;

    User.find({ 
            $or: [ 
                {email: { $regex: query, $options: 'i' }},
                {first_name: { $regex: query, $options: 'i' }},
                {last_name: { $regex: query, $options: 'i' }},
            ],
            _id: {$ne: id} // exclude user from search
        })
        .populate('avatar')
        .select('first_name last_name email alias job avatar')
        .limit(8)
        .exec()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));

});

// get a user's public profile
router.get('/:id', auth.optional, (req, res, next) => {

    User.findById(req.params.id)
        .populate('avatars')
        .select('-address -hash -salt')
        .exec()
        .then(user => {

            // get user's books
            Variant.find({user: req.params.id, status: {$ne: 'Recommended'}})
                .populate('book')
                .exec()
                .then(variants => {
                    res.status(200).json({user, variants});
                })

        })
        .catch(err => res.status(500).json(err));
})

module.exports = router;