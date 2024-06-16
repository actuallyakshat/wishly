import nodemailer from "nodemailer";

export const mailClient = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  secure: false,
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
