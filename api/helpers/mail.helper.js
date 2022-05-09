var nodemailer = require('nodemailer');

const sendmail = (recepient, name, pass) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        secure: true, // true for 465, false for other ports
        secureConnection: false,
        auth: {
            user: 'adakdhrubajyoti760@gmail.com',
            pass: 'cwenguhiohgxydyk'
        }
    });
    var mailOptions = {
        from: 'no-reply@mailinator.com',
        to: recepient,
        subject: 'User Creation Successfull',
        html: '<p style="font-style: 100px;"> Hi '+name+', </p><p style="margin-top:25px;"> Your credentials are as follows</p><p style= "margin-top: 10px; margin-bottom: 0px !important;"><span style="font-weight: bolder;">User Name:</span>  '+recepient+'</p><p style= " margin-top: 0px !important;"><span style="font-weight: bolder;">Password:</span> '+pass+'</p><p style="color:mediumblue ; margin-bottom: 0px !important;">Thanks & regards,</p><p style="color:mediumblue; margin-top: 0px !important;">Team Appbot</p>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
} 


module.exports = sendmail;

