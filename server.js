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
const friendRequestRouter = require('./routers/friendRequestRouter');
const newsfeedRouter = require('./routers/newsfeedRouter');
const notificationRouter = require('./routers/notificationRouter');
const requestRouter = require('./routers/requestRouter');

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
app.use('/api/v1/newsfeeds', newsfeedRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/friend-requests', friendRequestRouter);
app.use('/api/v1/notifications', friendRequestRouter);

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