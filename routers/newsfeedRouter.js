'use strict'

const express = require('express');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/user.model');
const Newsfeed = require('../models/newsfeed.model');


//*********** API ****************/
// get all newsfeeds for current user
router.get('/', auth.required, (req, res) => {
    const { payload: { id } } = req;

    // get user
    User.findById(id)
        .exec()
        .then(user => {
            // get newsfeed involving user's friend
            Newsfeed.find({ 
                    $or: [
                        {friend: { $in: user.friends } },
                        {admin: true}
                    ]
                })
                .sort('createdAt')
                .populate('book')
                .populate('avatar')
                .populate({
                    path: 'friend',
                    model: 'User',
                    select: 'first_name last_name avatar',
                    populate: {
                        path: 'avatar',
                        model: 'Avatar',
                        select: 'image'
                    }
                })
                .populate({
                    path: 'community_member',
                    model: 'User',
                    select: 'first_name last_name avatar',
                    populate: {
                        path: 'avatar',
                        model: 'Avatar',
                        select: 'image'
                    }
                })
                .limit(20)
                .exec()
                .then(newsfeeds => {
                    res.status(200).json(newsfeeds);
                })

        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
})

module.exports = router;
