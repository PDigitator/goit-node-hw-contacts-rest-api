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
