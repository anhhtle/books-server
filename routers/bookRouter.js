'use strict'

const express = require('express');
var mongoose = require ('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Variant = require('../models/variant.model');
const Book = require('../models/book.model');

router.use(bodyParser.json());

//*********** API ****************/

// get all book variants
router.get('/', (req, res) => {
    Variant.find().populate(['book', 'user']).exec()
        .then(books => {
            res.status(200).json(books);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

// get all book variants belonging to a user
router.get('/user/:userId', (req, res) => {
    var userId = new mongoose.Types.ObjectId("5bc39d60f6fc0cd8ae6fd6a4");

    Variant.find({user: userId})
    .populate(['user', 'book'])
    .exec()
        .then(books => {
            res.status(200).json(books);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

module.exports = router;
