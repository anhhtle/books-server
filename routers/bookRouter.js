'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const auth = require('./auth');

const Variant = require('../models/variant.model');
const Book = require('../models/book.model');

//*********** API ****************/

// get all book variants belonging to a user
router.get('/user/:userId', auth.required, (req, res) => {
    // const userId = new mongoose.Types.ObjectId("5bc39d60f6fc0cd8ae6fd6a5");
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    Variant.find({user: userId})
        .populate('book')
        .populate({
            path: 'friend',
            model: 'User',
            select: '-address'
        })
        .exec()
        .then(variants => {
            res.status(200).json(variants);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

// user add new book
router.post('/user/:userId', auth.required, (req, res) => {
    const { body: { book } } = req;
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    // check if book exists
    Book.findOne({google_id: book.google_id})
        .exec()
        .then(bookDB => {
            if (bookDB !== null) {
                const newVariant = {
                    user: userId,
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
                        user: userId,
                        book: new mongoose.Types.ObjectId(book._id)
                    }

                    // create variant
                    return Variant.create(newVariant).then(variant => {
                        res.status(201).json(variant);
                    })
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({error: 'something went wrong'});
                });
            }
        })
})

module.exports = router;
