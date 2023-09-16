const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAILTRAP_HOST, MAILTRAP_USER, MAILTRAP_PASS } = process.env;

const nodemailerConfig = {
  host: MAILTRAP_HOST,
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: "o.nikolaiev@yahoo.com" };

  return transport.sendMail(email);
};

module.exports = sendEmail;

// const email = {
//   to: "o.nikolaiev@yahoo.com",
//   from: "o.nikolaiev@yahoo.com",
//   subject: "Test amail",
//   html: "<p><strong>Test amail</strong> from localhost:3000</p>",
//   text: "Test amail</strong> from localhost:3000",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send successfully"))
//   .catch((error) => console.log(error.messages));
