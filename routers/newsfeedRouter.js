'use strict'

const express = require('express');
// const mongoose = require ('mongoose');
const router = express.Router();
const auth = require('./auth');

const Newsfeed = require('../models/newsfeed.model');


//*********** API ****************/

// get all newsfeeds
router.get('/', auth.required, (req, res) => {
    Newsfeed.find()
        .populate('book')
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
        .exec()
        .then(newsfeeds => {
            res.status(200).json(newsfeeds);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

// get all newsfeeds for current user



// router.get('/user/', auth.required, (req, res) => {
//     const { payload: { id } } = req;

//     Variant.find({user: id})
//         .populate('book')
//         .populate({
//             path: 'friend',
//             model: 'User',
//             select: '-address'
//         })
//         .exec()
//         .then(variants => {
//             res.status(200).json(variants);
//         }).catch(err => {
//             console.error(err);
//             res.status(500).json({error: 'something went wrong'});
//         })
// });


module.exports = router;
