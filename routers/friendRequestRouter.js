'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/user.model');
const FriendRequest = require('../models/friendRequest.model');
const Notification = require('../models/notification.model');

//*********** API ****************/

// ********************* friends *******************************

// get user's friend requests
router.get('/', auth.required, (req, res) => {
    const { payload: { id } } = req;

    FriendRequest.find({
        $or: [
            {requestee: id},
            {requester: id}
        ],

    })
    .populate({
        path: 'requester',
        model: 'User',
        select: 'first_name last_name avatar alias job',
        populate: {
            path: 'avatar',
            model: 'Avatar'
        }
    })
    .populate({
        path: 'requestee',
        model: 'User',
        select: 'first_name last_name avatar alias job',
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
router.post('/', auth.required, (req, res) => {
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

                // create friend request
                const newFriendRequest = new FriendRequest(createObj);

                newFriendRequest.save()
                    .then((request) => {

                        // create notification
                        const createNotificationObj = {
                            type: 'Friend request',
                            user: id,
                            friend: friend_id
                        }

                        Notification.create(createNotificationObj).then(() => {
                            res.status(201).json(request)       
                        })

                    });
            }
        })
        .catch(err => res.status(500).json(err));
});

// accept friend-request
router.put('/accept', auth.required, (req, res, next) => {
    const { payload: { id }, body: {request_id}  } = req;

    FriendRequest.findByIdAndUpdate(request_id, {status: 'Accepted'}, {new: true}).exec()
        .then(request => {

            // add self to friend's list
            User.findByIdAndUpdate(request.requester, { "$push": { "friends": id } }, {new: true})
                .exec();

            // add friend to self's list
            User.findByIdAndUpdate(id, { "$push": { "friends": request.requester } }, {new: true})
                .exec();

            // create notification
            const createNotificationObj = {
                type: 'New friend',
                user: id,
                friend: friend_id
            }

            Notification.create(createNotificationObj).then(() => {
                res.status(201).json(request)       
            })

            request.delete()
                .then(requestDeleted => res.status(201).json(requestDeleted))
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;