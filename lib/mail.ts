import nodemailer from "nodemailer";

export const mailClient = nodemailer.createTransport({
  pool: true,
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
