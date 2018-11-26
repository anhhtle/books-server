'use strict'

const express = require('express');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/user.model');
const Variant = require('../models/variant.model');
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
        .then(newsfeeds => {
            res.status(200).json(newsfeeds);
        })

})

// create request
router.post('/user/', auth.required, (req, res) => {
    const { payload: {id}, body: {variant_id} } = req;

    Variant.findById(variant_id).exec()
        .then(variant => {
            if (!variant.available_for_share || variant.share_requested ) {
                res.status(501).json({message: 'Book is no longer available'})
            }
            else {

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
router.put('/user/', auth.required, (req, res) => {
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
                res.status(200).json(request)
            })
            .catch(err => res.status(500).json(err));
    }

    const updateObj = {status: status, updated_at: new Date()}

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
        
                Variant.findByIdAndUpdate(request.variant, updateVariantObj, {new: true})
                    .exec()
                    .then(() => {
                        res.status(200).json(request)
                    })  
            } else {
                res.status(200).json(request)
            }
        })
        .catch(err => res.status(500).json(err));
})


module.exports = router;
