'use strict';

require('dotenv').config();
require('./config/passport');

// env
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// middlewares
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// routers
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const avatarRouter = require('./routers/avatarRouter');

mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());

// ignoring a DeprecationWarning
mongoose.set('useFindAndModify', false);

// routes
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/avatars', avatarRouter);

let server;

function runServer(databaseUrl, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
            if (err) {
                return reject(err);
            }

            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

// `closeServer` function is here in original code
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
};