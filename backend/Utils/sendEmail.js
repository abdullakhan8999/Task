const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
   //Transporter service Info
   //SMPT - simple mail transfer protocols

   //transporter
   const transporter = nodeMailer.createTransport({
      service: process.env.SMPT_SERVICE,
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      auth: {
         user: process.env.SMPT_EMAIL_USER,
         pass: process.env.SMPT_EMAIL_PASS,
      },
   });

   //Options
   const mailOptions = {
      from: process.env.SMPT_EMAIL_USER,
      to: options.email,
      subject: options.subject,
      html: options.message,
   };

   //Send Email
   await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;