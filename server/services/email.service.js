require('dotenv').config();
const nodemailer = require("nodemailer");
const emailTemplate = require('../templates/email.template');

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async (email, password) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE_HOST,
    port: process.env.EMAIL_SERVICE_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVICE_USER, // generated ethereal user
      pass: process.env.EMAIL_SERVICE_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "SURGE ASSESSMENT USER CREDENTIALS", // Subject line
    text: "", // plain text body
    html: emailTemplate.getHTMLTemplate(email, password) // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

