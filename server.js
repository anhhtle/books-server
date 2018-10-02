'use strict';

require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
// env
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
mongoose.Promise = global.Promise;

// route
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);


// closeServer needs access to a server object, but that only gets created when `runServer` runs, 
// so we declare `server` here and then assign a value to it in run
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