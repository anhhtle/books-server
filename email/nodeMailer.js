const nodemailer = require('nodemailer');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anh.ht.le@gmail.com',
        pass: 'Anhleash1!'
    }
});

const sendPasswordResetEmail = new Email({
    template: './templates/resetPassword',

    message: {
        from: 'anh.ht.le@gmail.com',
        subject: 'subject',
        to: 'ahtle@stanford.edu',

    },
    locals: {
        name: 'nameeeee',
    },
    send: true,
    transport: transporter
});


// const sendPasswordResetEmail = () => {
//     email.send()
//         .then(console.log)
//         .catch(console.error);
// };








// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'anh.ht.le@gmail.com',
//         pass: 'Anhleash1!'
//     }
// });

// export const sendPasswordResetEmail = (emailData) => {
//     console.log(emailData);

//     var mailOptions = {
//         from: 'anh.ht.le@gmail.com',
//         to: emailData.to,
//         subject: `Password Reset - The Book's Journey`,
//         text: 'That was easy!'
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// };

module.exports = {sendPasswordResetEmail};