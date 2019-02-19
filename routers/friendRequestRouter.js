'use strict'

const express = require('express');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/user.model');
const FriendRequest = require('../models/friendRequest.model');
const Notification = require('../models/notification.model');
const Newsfeed = require('../models/newsfeed.model');

// email
const {friendRequestEmail} = require('../email/nodeMailer');


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
    .sort('createdAt')
    .exec()
    .then(requests => {
        res.status(200).json(requests);
    })
    .catch(err => res.status(500).json(err));
});

// create friend request
router.post('/', auth.required, (req, res) => {
    const { payload: { id }, body: { friend_id } } = req;

    // check if there's an existing request
    FriendRequest.findOne({requester: id, requestee: friend_id})
    .exec()
        .then(request => {
            if (request) {
                res.status(409).json({message: 'Already sent friend request to this user'})
            } else {
                const createObj = {
                    requester: id,
                    requestee: friend_id
                }

                // create friend request
                const newFriendRequest = new FriendRequest(createObj);

                newFriendRequest.save()
                    .then(() => {
                      
                        // create notification
                        const createNotificationObj = {
                            type: 'Friend request',
                            user: id,
                            friend: friend_id
                        }
                        
                        Notification.create(createNotificationObj).then(() => {
                            FriendRequest.findById(newFriendRequest._id)
                                .populate({
                                    path: 'requester',
                                    model: 'User',
                                    select: 'first_name last_name avatar alias job',
                                    populate: {
                                        path: 'avatar',
                                        model: 'Avatar',
                                        select: 'image'
                                    }
                                })
                                .populate({
                                    path: 'requestee',
                                    model: 'User',
                                    select: 'first_name last_name avatar alias job, email',
                                    populate: {
                                        path: 'avatar',
                                        model: 'Avatar',
                                        select: 'image'
                                    },
                                    populate: {
                                        path: 'setting',
                                        model: 'Setting'
                                    }
                                })
                                .exec()
                                .then((newFriendRequestPopulated) => {

                                    // send friend request email
                                    if (newFriendRequestPopulated.requestee.setting.email_notifications.friend_requests) {
                                        friendRequestEmail({
                                            to: newFriendRequestPopulated.requestee.email, 
                                            name: newFriendRequestPopulated.requestee.first_name, 
                                            friend: `${newFriendRequestPopulated.requester.first_name} ${newFriendRequestPopulated.requester.last_name}`});
                                    }

                                    res.status(201).json(newFriendRequestPopulated)       
                                })
                        })

                    });
            }
        })
        .catch(err => res.status(500).json(err));
});

// accept friend-request
router.put('/accept', auth.required, (req, res) => {
    const { payload: { id }, body: {request_id}  } = req;

    FriendRequest.findByIdAndUpdate(request_id, {status: 'Accepted'}, {new: true}).exec()
        .then(request => {

            // add self to friend's list
            User.findById(request.requester).exec()
                .then(user => {
                    let friendsArr = user.friends;
                    friendsArr.push(id);
                    user.friends = friendsArr;

                    // check avatar The Fellowship
                    if (user.friends.length === 7) {
                        let newAvatarsUnlocked = user.avatars_unlocked;
                        newAvatarsUnlocked.push('18a4af4927a1fbfeefaf846b');
                        user.avatars_unlocked = newAvatarsUnlocked;

                        // newsfeed
                        const newNewsfeedObj = {
                            type: 'Friend: avatar',
                            friend: user._id,
                            avatar: '18a4af4927a1fbfeefaf846b'
                        }
                        Newsfeed.create(newNewsfeedObj);

                        // notification
                        const createNotificationObj = {
                            type: 'Avatar',
                            user: user._id,
                            avatar: '18a4af4927a1fbfeefaf846b'
                        }
                        Notification.create(createNotificationObj);
                    }

                    user.save();
                });

            // add friend to self's list

            User.findById(id).exec()
                .then(user => {
                    let friendsArr = user.friends;
                    friendsArr.push(request.requester);
                    user.friends = friendsArr;

                    if (user.friends.length === 7) {
                        let newAvatarsUnlocked = user.avatars_unlocked;
                        newAvatarsUnlocked.push('18a4af4927a1fbfeefaf846b');
                        user.avatars_unlocked = newAvatarsUnlocked;

                        // newsfeed
                        const newNewsfeedObj = {
                            type: 'Friend: avatar',
                            friend: user._id,
                            avatar: '18a4af4927a1fbfeefaf846b'
                        }
                        Newsfeed.create(newNewsfeedObj);

                        // notification
                        const createNotificationObj = {
                            type: 'Avatar',
                            user: user._id,
                            avatar: '18a4af4927a1fbfeefaf846b'
                        }
                        Notification.create(createNotificationObj);
                    }

                    user.save();
                });

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

// delete friend request
router.delete('/:id', auth.required, (req, res) => {

    FriendRequest.findById(req.params.id).exec()
        .then(friendReq => {
            friendReq.delete()
                .then(deleted => res.status(200).json(deleted))
        })
        .catch(err => res.status(500).json(err));
});

// seen requests
router.put('/seen', auth.required, (req, res) => {
    const { payload: { id } } = req;

    FriendRequest.find({requestee: id}).exec()
        .then((reqs) => {
            reqs.map(req => {
                req.new = false;
                req.save();
            });

            res.status(200).json(reqs);
        })
        .catch(err => res.status(500).json(err));
});


module.exports = router;