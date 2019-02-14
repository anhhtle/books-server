const nodemailer = require('nodemailer');
const { reminderEmailTemplate, bookRequestEmailTemplate, bookRequestCancelledEmailTemplate, bookSentEmailTemplate } = require('./emailTemplates');
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

const sendPasswordResetEmail = (mailData) => {

    var mailOptions = {
        from: 'anh.ht.le@gmail.com',
        to: mailData.to,
        subject: `The Book's Journey - Password Reset`,
        html: reminderEmailTemplate(mailData)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: Password Reset' + info.response);
        }
    });
};

const sendBookRequestEmail = (mailData) => {

    var mailOptions = {
        from: 'anh.ht.le@gmail.com',
        to: mailData.to,
        subject: `The Book's Journey - Book Request`,
        html: bookRequestEmailTemplate(mailData)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: Book Request' + info.response);
        }
    });
};

const sendBookRequestCancelledEmail = (mailData) => {

    var mailOptions = {
        from: 'anh.ht.le@gmail.com',
        to: mailData.to,
        subject: `The Book's Journey - Book Request Cancelled`,
        html: bookRequestCancelledEmailTemplate(mailData)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: Book Request Cancelled' + info.response);
        }
    });
};

const bookSentEmail = (mailData) => {

    var mailOptions = {
        from: 'anh.ht.le@gmail.com',
        to: mailData.to,
        subject: `The Book's Journey - Book Sent`,
        html: bookSentEmailTemplate(mailData)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: Book sent' + info.response);
        }
    });
};

module.exports = {sendPasswordResetEmail, sendBookRequestEmail, sendBookRequestCancelledEmail, bookSentEmail};