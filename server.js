'use strict';

require('dotenv').config();
require('./config/passport');
require('./config/mongoosePaginate');

// env
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

console.log(DATABASE_URL);

// middlewares
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// ignoring a DeprecationWarning
mongoose.set('useFindAndModify', false);

// routes
// app.get('/', (req, res) => {
//     console.log('asdfdsa');
//     res.json({body: 'hello world'})
// });

app.get('/api/v1', (req, res) => {
    res.json({body: 'api v1'})
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/avatars', avatarRouter);
app.use('/api/v1/newsfeeds', newsfeedRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/friend-requests', friendRequestRouter);
app.use('/api/v1/notifications', friendRequestRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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