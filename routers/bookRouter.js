'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Book = require('../models/book.model');

router.use(bodyParser.json());

//*********** API ****************/

// get all books
router.get('/', (req, res) => {
    Book.find()
        .then(books => {
            res.status(200).json(books);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

module.exports = router;