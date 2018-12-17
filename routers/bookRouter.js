'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const auth = require('./auth');

const Variant = require('../models/variant.model');
const Book = require('../models/book.model');

//*********** API ****************/

// get all book variants belonging to a user
router.get('/', auth.required, (req, res) => {
    const { payload: { id } } = req;

    Variant.find({user: id})
        .populate('book')
        .populate({
            path: 'friend',
            model: 'User',
            select: 'first_name last_name avatar',
            populate: {
                path: 'avatar',
                model: 'Avatar'
            }
        })
        .exec()
        .then(variants => {
            res.status(200).json(variants);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

// add new book for current user
router.post('/', auth.required, (req, res) => {
    const {payload: {id}, body: { book } } = req;

    // check if book exists
    Book.findOne({google_id: book.google_id})
        .exec()
        .then(bookDB => {
            if (bookDB !== null) {
                // book exists.. just need to create variant for user
                const newVariant = {
                    user: id,
                    book: new mongoose.Types.ObjectId(bookDB._id)
                }

                return Variant.create(newVariant).then(variant => {
                    res.status(201).json(variant);
                })
            } else {
                const newBook = {...book};

                // if book is not found, create new book...
                return Book.create(newBook).then(book => {
                    const newVariant = {
                        user: id,
                        book: new mongoose.Types.ObjectId(book._id)
                    }

                    // create variant
                    return Variant.create(newVariant).then(variant => {
                        res.status(201).json(variant);
                    })
                })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        });
})

// update a varaint
router.put('/', auth.required, (req, res) => {
    const { body: { variant_id, update } } = req;

    Variant.findByIdAndUpdate(variant_id, update, {new: true})
        .exec()
        .then(variant => res.status(200).json(variant))
        .catch(err => res.status(500).json(err));
});

// delete a variant
router.delete('/:id', auth.required, (req, res) => {

    Variant.findById(req.params.id).exec()
        .then(variant => {
            variant.delete()
                .then(deletedVar => res.status(200).json(deletedVar))
        })
        .catch(err => res.status(500).json(err));
});

// get all variants available for share
router.post('/community', auth.optional, (req, res) => {
    let id = null;
    if (req.payload) {
        id = req.payload.id;
    }

    let query;
    if (id) {
        query = {
            $and: [
                { available_for_share: true },
                { share_requested: false },
                { user: {$ne: id} } // exclude variants belonging to current user
            ]
        }
    } else {
        query = {
            $and: [
                { available_for_share: true },
                { share_requested: false },
            ]
        }
    }

    const options = {
        select: 'book user book_condition',
        populate: [
            { path: 'book', model: 'Book' },
            {
                path: 'user',
                model: 'User',
                select: 'first_name last_name avatar',
                populate: {
                    path: 'avatar',
                    model: 'Avatar',
                    select: 'image'
                }
            }
        ],
        page: req.body.page
    };

    Variant.paginate(query, options)
        .then(variants => {
            res.status(200).json(variants);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })

})

// search variant available for share by title and author
router.post('/community/search', auth.optional, (req, res) => {
    const { body: { query } } = req;

    let id = null;
    if (req.payload) {
        id = req.payload.id;
    }

    let bookArr = [];
    Book.find({
        $or: [
            { title: { $regex: query, $options: 'i'}},
            { authors: { $regex: query, $options: 'i'}},
        ]
    })
    .then((books) => {
        books.map(book => {
            bookArr.push(book._id);
        })
    })
    .then(() => {
        let q;
        if (id) {
            q = {
                $and: [
                    { available_for_share: true },
                    { share_requested: false },
                    { user: {$ne: id} }, // exclude variants belonging to current user
                    { book: {$in: bookArr}}
                ]
            }
        } else {
                q = {
                    $and: [
                        { available_for_share: true },
                        { share_requested: false },
                        {book: {$in: bookArr}}
                    ]
                }
        }

        const options = {
            select: 'book user book_condition',
            populate: [
                { 
                    path: 'book',
                    model: 'Book',
                },
                {
                    path: 'user',
                    model: 'User',
                    select: 'first_name last_name avatar',
                    populate: {
                        path: 'avatar',
                        model: 'Avatar',
                        select: 'image'
                    }
                }
            ],
            page: req.body.page
        };

        Variant.paginate(q, options)
            .then(variants => {
                res.status(200).json(variants);
            })
            .catch(err => res.status(500).json(err));

    })




});

module.exports = router;
