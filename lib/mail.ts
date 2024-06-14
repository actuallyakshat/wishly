import { SMTPClient } from "emailjs";

export const mailClient = new SMTPClient({
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASS,
  host: process.env.MAIL_HOST,
  ssl: true,
});
