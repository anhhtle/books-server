'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user.model');

router.use(bodyParser.json());

//*********** API ****************/

// get all users
router.get('/', (req, res) => {
    User.find().exec()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

// get a user
router.get('/:userId', (req, res) => {
    User.findById(req.params.userId).exec()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
});

module.exports = router;