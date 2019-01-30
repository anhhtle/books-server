const nodemailer = require('nodemailer');
const { reminderEmailTemplate } = require('./emailTemplates');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anh.ht.le@gmail.com',
        pass: 'Anhleash1!'
    }
});

const sendPasswordResetEmail = (mailData) => {

    var mailOptions = {
        from: 'anh.ht.le@gmail.com',
        to: mailData.to,
        subject: `Password Reset - The Book's Journey`,
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

module.exports = {sendPasswordResetEmail};