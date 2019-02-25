'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/user.model');
const Variant = require('../models/variant.model');
const Book = require('../models/book.model');
const Newsfeed = require('../models/newsfeed.model');

const fetch = require("node-fetch");
const GOOGLE_BOOK_API_KEY = process.env.GOOGLE_BOOK_API_KEY;

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
    const {payload: {id}, body: { book, status } } = req;

    // check if book exists
    Book.findOne({google_id: book.google_id})
        .exec()
        .then(bookDB => {
            if (bookDB !== null) {
                // book exists.. update book then create variant
                bookDB.description = book.description;
                bookDB.ratings = book.ratings;
                bookDB.image = book.image;
                bookDB.categories = book.categories;
                bookDB.save();

                const newVariant = {
                    user: id,
                    status,
                    book: new mongoose.Types.ObjectId(bookDB._id)
                }

                Variant.create(newVariant).then(variant => {
                    // newsfeed
                    const newNewsfeed = {
                        type: 'Friend: new book',
                        book: bookDB._id,
                        friend: id
                    }
                    Newsfeed.create(newNewsfeed);

                    res.status(201).json(variant);
                })
            } else {
                const newBook = {...book};

                // // if book is not found, create new book...
                Book.create(newBook).then(bookCreated => {
                    const newVariant = {
                        user: id,
                        status,
                        book: new mongoose.Types.ObjectId(bookCreated._id)
                    }

                    // create variant
                    Variant.create(newVariant).then(variant => {
                        // newsfeed
                        const newNewsfeed = {
                            type: 'Friend: new book',
                            book: bookCreated._id,
                            friend: id
                        }
                        Newsfeed.create(newNewsfeed);

                        res.status(201).json(variant);
                    })
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({error: 'something went wrong'});
                });
            }


        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        });
})

// update a varaint
router.put('/', auth.required, (req, res) => {
    const { payload: {id}, body: { variant_id, update } } = req;
    
    
    // handle newsfeed
    Variant.findById(variant_id).exec()
    .then(variant => {
        if (variant.status !== 'Reading' && update.status === 'Reading') {
            const newNewsfeed = {
                type: 'Friend: reading',
                book: variant.book,
                friend: variant.user,
            }
            Newsfeed.create(newNewsfeed);
        }
        if (variant.available_for_share !== true && update.available_for_share === true) {
            User.findById(id).exec()
                .then(user => {
                    const newNewsfeed = {
                        type: 'Friend: sharing book',
                        book: variant.book,
                        friend: variant.user,
                        admin: user.admin
                    }
                    Newsfeed.create(newNewsfeed);
                })
        }
    })

    // update
    Variant.findByIdAndUpdate(variant_id, update, {new: true})
        .exec()
        .then(variant => res.status(200).json(variant))
        .catch(err => res.status(500).json(err));
});

// delete a variant
router.delete('/:id', auth.required, (req, res) => {

    Variant.findById(req.params.id).exec()
        .then(variant => {
            variant.remove()
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
        sort: '-createdAt',
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


// ***************** FRIEND *********************

// get all friend's variant
router.get('/friend/:id', auth.required, (req, res) => {

    Variant.find({
        $and: [
            { user: req.params.id },
            { status: {$ne: 'Recommended'} }
        ]
    })
        .populate('book')
        .populate({
            path: 'user',
            model: 'User',
            select: 'first_name last_name avatar avatars_unlocked',
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

// ***************** GOOGLE book API ***************
router.post('/search', auth.optional, (req, res) => {
    const { body: { query } } = req;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOK_API_KEY}&country=US`)
        .then(res => res.json())
        .then(resJson => {
            res.status(200).json(resJson);
        }).catch(err => {
            console.error(err);
        });
})


module.exports = router;
