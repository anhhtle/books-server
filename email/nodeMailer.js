const nodemailer = require('nodemailer');
const { reminderEmailTemplate, bookRequestEmailTemplate } = require('./emailTemplates');
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
            console.log('Email sent: ' + info.response);
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
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {sendPasswordResetEmail, sendBookRequestEmail};