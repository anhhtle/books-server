'use strict'

const express = require('express');
const router = express.Router();
const auth = require('./auth');

const Avatar = require('../models/avatar.model');


//*********** API ****************/

router.get('/', auth.optional, (req, res, next) => {
    Avatar.find().exec()
        .then(avatars => {
            res.status(200).json(avatars);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went wrong'});
        })
})


module.exports = router;