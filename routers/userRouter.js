'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const passport = require('passport');
const auth = require('./auth');

const User = require('../models/user.model');
const Variant = require('../models/variant.model');
const Setting = require('../models/setting.model');
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


// delete current user
router.delete('/current', auth.required, (req, res) => {
    const { payload: { id } } = req;

    User.findById(id)
        .then(user => {

            // delete user's setting relation
            Setting.findById(user.setting)
                .then(setting => setting.delete());

            // delete all of user's variants
            let variant = Variant;
            variant.delete({user: id}).exec();

            user.delete()
                .then(deletedUser => {
                    res.status(200).json(deletedUser) 
                });
        })
        .catch(err => res.status(500).json(err));
});


// ********************* friends *******************************

// find friend by email
router.post('/friend/search', auth.required, (req, res) => {
    const { payload: {id}, body: { query } } = req;

    User.find({ 
            email: { $regex: query, $options: 'i' },
            _id: {$ne: id} // exclude user from search
        })
        .select('-address -friends -hash -salt -avatars_unlocked')
        .limit(8)
        .exec()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));

});

// get user's friend requests
router.get('/current/friend-requests', auth.required, (req, res) => {
    const { payload: { id } } = req;

    FriendRequest.find({requestee: id})
        .populate({
            path: 'requester',
            model: 'User',
            select: 'first_name last_name avatar',
            populate: {
                path: 'avatar',
                model: 'Avatar'
            }
        })
        .then(requests => {
            res.status(200).json(requests);
        })
        .catch(err => res.status(500).json(err));
});

// create friend request
router.post('/current/friend-requests', auth.required, (req, res) => {
    const { payload: { id }, body: { friend_id } } = req;

    // check if there's an existing request
    FriendRequest.findOne({requester: id, requestee: friend_id}).exec()
        .then(user => {
            if (user) {
                res.status(409).json({message: 'Already sent friend request to this user'})
            } else {
                const createObj = {
                    requester: id,
                    requestee: friend_id
                }
            
                FriendRequest.create(createObj, function (err, request) {
                    if (err) return handleError(err);
                    
                    // saved!
                    res.status(201).json(request)
                  });
            }
        })
        .catch(err => res.status(500).json(err));
});

// accept friend-request
router.put('/current/friend-requests/accept', auth.required, (req, res, next) => {
    const { payload: { id }, body: {request_id}  } = req;

    FriendRequest.findByIdAndUpdate(request_id, {status: 'Accepted'}, {new: true}).exec()
        .then(request => {

            // add self to friend's list
            User.findByIdAndUpdate(request.requester, { "$push": { "friends": id } }, {new: true})
                .exec();

            // add friend to self's list
            User.findByIdAndUpdate(id, { "$push": { "friends": request.requester } }, {new: true})
                .exec();

            request.delete()
                .then(requestDeleted => res.status(201).json(requestDeleted))
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