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
const cronJob = require('cron').CronJob;

// routers
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const avatarRouter = require('./routers/avatarRouter');
const friendRequestRouter = require('./routers/friendRequestRouter');
const newsfeedRouter = require('./routers/newsfeedRouter');
const notificationRouter = require('./routers/notificationRouter');
const requestRouter = require('./routers/requestRouter');

// model
const User = require('./models/user.model');
const Request = require('./models/request.model');
const Variant = require('./models/variant.model');

// email
const {sendBookRequestCancelledEmail} = require('./email/nodeMailer');

mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// ignoring a DeprecationWarning
mongoose.set('useFindAndModify', false);

app.get('/api/v1', (req, res) => {
    res.json({body: 'api v1 - 2/27/2019'})
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


// ****************** cron job ***************************
// pattern *(min) *(hr) *(d) *(m) *(d of w)

// run every Friday at 8 AM
const refreshBookmarksJob = new cronJob('0 8 * * 5', () => {
    User.find({'bookmarks.silver': {$lt: 2} }).exec()
        .then(users => {
            users.map(user => {
                user.bookmarks.silver = 2;
                user.save();
                console.log('refreshBookmarksJob ran');
            });
        })
        .catch(err => console.error(err));
});  

// run everyday at 8 AM
const checkFiveDaysOldRequests = new cronJob('0 8 * * *', () => {
    console.log('checkFiveDaysOldRequests ran')

    let currentDate = new Date();
    let fiveDaysAgo = currentDate.setDate(currentDate.getDate() - 5);

    Request.find({
        $and: [
            { status: 'Requesting' },
            { createdAt: {$lt: fiveDaysAgo} },
        ]
    })
    .populate({
        path: 'variant',
        model: 'Variant',
        select: 'book',
        populate: {
            path: 'book',
            model: 'Book',
        }
    })
    .exec()
    .then(requests => {
        requests.map(request => {
            request.status = 'Cancelled';
            request.save();

            // return bookmark to user and send email
            User.findById(request.requester)
            .populate('setting')
            .exec()
                .then(requester => {
                    if (requester.bookmarks.silver < 2) {
                        requester.bookmarks.silver = ++requester.bookmarks.silver;
                    } else {
                        requester.bookmarks.gold = ++requester.bookmarks.gold;
                    }
                    requester.save();
    
                    if (requester.setting.email_notifications.book_requests) {
                        sendBookRequestCancelledEmail({to: requester.email, name: requester.first_name, title: request.variant.book.title});
                    }
                });
    
            Variant.findByIdAndUpdate(request.variant, {share_requested: false}, {new: true})
                .exec()
                .catch(err => console.error(err));
        })

    })
    .catch(err => console.error(err));
});  


//*************** server **************************
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

// start cronjob after server starts
refreshBookmarksJob.start();
checkFiveDaysOldRequests.start();