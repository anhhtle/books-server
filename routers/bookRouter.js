'use strict'

const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const auth = require('./auth');

const Variant = require('../models/variant.model');
const Book = require('../models/book.model');

//*********** API ****************/

// get all book variants belonging to a user
router.get('/user/', auth.required, (req, res) => {
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
router.post('/user', auth.required, (req, res) => {
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
router.put('/user', auth.required, (req, res) => {
    const { body: { variant_id, update } } = req;

    let updateObj = update;

    if (update.status === 'Read' || update.progress === 100) {
        updateObj.status = 'Read';
        updateObj.progress = 100
    } else if (update.status === 'Not read' || update.progress === 0) {
        updateObj.status = 'Not read';
        updateObj.progress = 0
    }

    Variant.findByIdAndUpdate(variant_id, updateObj, {new: true})
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

module.exports = router;
