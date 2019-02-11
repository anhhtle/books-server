'use strict'

const express = require('express');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/user.model');
const Variant = require('../models/variant.model');
const Request = require('../models/request.model');
const Newsfeed = require('../models/newsfeed.model');
const Notification = require('../models/notification.model');


//*********** API ****************/
// get current user's requests
router.get('/', auth.required, (req, res) => {
    const { payload: { id } } = req;

    Request.find({ $or: [{original_owner: id}, {requester: id}] })
        .populate({
            path: 'variant',
            model: 'Variant',
            select: 'book',
            populate: {
                path: 'book',
                model: 'Book',
            }
        })
        .populate({
            path: 'original_owner',
            model: 'User',
            select: 'first_name last_name avatar address',
            populate: {
                path: 'avatar',
                model: 'Avatar',
                select: 'image'
            }
        })
        .populate({
            path: 'requester',
            model: 'User',
            select: 'first_name last_name avatar address',
            populate: {
                path: 'avatar',
                model: 'Avatar',
                select: 'image'
            }
        })
        .exec()
        .then(requests => {
            res.status(200).json(requests);
        })

})

// create request
router.post('/', auth.required, (req, res) => {
    const { payload: {id}, body: {variant_id} } = req;

    Variant.findById(variant_id).exec()
        .then(variant => {
            if (!variant.available_for_share || variant.share_requested ) {
                res.status(501).json({message: 'Book is no longer available'})
            }
            else {

                // remove a token from user
                User.findById(id).exec()
                    .then(user => {
                        if (user.bookmarks.silver > 0) {
                            user.bookmarks.silver = --user.bookmarks.silver;
                        } else if (user.bookmarks.gold > 0) {
                            user.bookmarks.gold = --user.bookmarks.gold;
                        }
                        user.save();
                    })

                variant.share_requested = true;
                variant.save()
                    .then(() => {
                        let createObj = {
                            variant: variant_id,
                            original_owner: variant.user,
                            requester: id
                        }
        
                        let request = new Request(createObj);
                        request.save()
                            .then(newRequest => res.status(201).json(newRequest));
                    })

            }
        })
        .catch(res => res.status(500).json(err));
});

// update requests
router.put('/', auth.required, (req, res) => {
    const { body: { request_id, status, hide_request, thanked_owner } } = req;

    if (hide_request) {
        return Request.findByIdAndUpdate(request_id, {hide_request}, {new: true})
            .exec()
            .then(request => {
                res.status(200).json(request)
            })
            .catch(err => res.status(500).json(err));
    }

    if (thanked_owner) {
        return Request.findByIdAndUpdate(request_id, {thanked_owner}, {new: true})
            .exec()
            .then(request => {
                // give bookowner a token
                User.findById(request.original_owner).exec()
                    .then(user => {
                        user.bookmarks.gold = ++user.bookmarks.gold;
                        user.save();
                    });

                res.status(200).json(request)
            })
            .catch(err => res.status(500).json(err));
    }

    const updateObj = {status: status};

    Request.findByIdAndUpdate(request_id, updateObj, {new: true})
        .exec()
        .then(request => {

            if (status === 'Sent') {
                const updateVariantObj = {user: request.requester, available_for_share: false, share_requested: false, status: "Not read", progress: 0, user_rating: null, friend: null, recieved_at: new Date()}
        
                Variant.findByIdAndUpdate(request.variant, updateVariantObj, {new: true})
                    .exec()
                    .then(() => {
                        res.status(200).json(request)
                    })  
            } else if (status ===  'Cancelled') {
                const updateVariantObj = {available_for_share: false, share_requested: false}
        
                // return bookmark to user
                User.findById(request.requester).exec()
                    .then(user => {
                        if (user.bookmarks.silver < 2) {
                            user.bookmarks.silver = ++user.bookmarks.silver;
                        } else {
                            user.bookmarks.gold = ++user.bookmarks.gold;
                        }
                        user.save();
                    })

                Variant.findByIdAndUpdate(request.variant, updateVariantObj, {new: true})
                    .exec()
                    .then(() => {
                        res.status(200).json(request)
                    });
            
            } else if (status === 'Received') {
                // give bookowner a token
                User.findById(request.original_owner).exec()
                    .then(user => {
                        user.bookmarks.gold = ++user.bookmarks.gold;
                        user.books_shared = ++user.books_shared


                        // check for avatar The Giver
                        if (user.books_shared === 10) {
                            let newAvatarsUnlocked = user.avatars_unlocked;
                            newAvatarsUnlocked.push('50e9c24bb89e18e943c51239');
                            user.avatars_unlocked = newAvatarsUnlocked;

                            // newsfeed
                            const newNewsfeedObj = {
                                type: 'Friend: avatar',
                                friend: request.original_owner,
                                avatar: '50e9c24bb89e18e943c51239'
                            }
                            Newsfeed.create(newNewsfeedObj);

                            // notification
                            const createNotificationObj = {
                                type: 'Avatar',
                                user: request.original_owner,
                                avatar: '50e9c24bb89e18e943c51239'
                            }
                            Notification.create(createNotificationObj);

                        }
                            
                        user.save();

                    });
                res.status(200).json(request);

            } else {
                res.status(200).json(request)
            }
        })
        .catch(err => res.status(500).json(err));
})


module.exports = router;
