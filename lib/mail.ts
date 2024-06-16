import nodemailer from "nodemailer";

// export const mailClient = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   secure: false,
//   port: 465,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

const SMTPOptions = {
  host: process.env.MAIL_HOST,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...SMTPOptions,
  });

  return await transporter.sendMail({
    from: process.env.MAIL_USER,
    ...data,
  });
};
