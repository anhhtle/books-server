'use strict'

const express = require('express');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/user.model');
const Request = require('../models/request.model');


//*********** API ****************/

// get all requests
router.get('/', auth.required, (req, res) => {
    Request.find()
        .populate({
            path: 'variant',
            model: 'Variant',
            populate: {
                path: 'book',
                model: 'Book'
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
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })

});

// get current user's requests
router.get('/user/', auth.required, (req, res) => {
    const { payload: { id } } = req;

    Request.find({ $or: [{owner: id}, {requester: id}] })
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
            path: 'owner',
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
        .then(newsfeeds => {
            res.status(200).json(newsfeeds);
        })

})

module.exports = router;
