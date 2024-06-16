"use server";

import generateOTP from "../generateOtp";
import { render } from "@react-email/components";
import OTPEmailTemplate from "@/lib/email-templates/OTPEmailTemplate";
import ReminderEmailTemplate from "../email-templates/ReminderTemplate";
import { Email } from "@prisma/client";
import { sendEmail } from "../mail";

type OTPStoreType = {
  [email: string]: number;
};
const OTPStore: OTPStoreType = {};
export async function sendotp(email: string) {
  try {
    if (!email) return;
    const OTP = generateOTP();
    OTPStore[email] = OTP;
    const otpTemplate = render(
      OTPEmailTemplate({ validationCode: OTP.toString() }),
    );

    setTimeout(
      () => {
        delete OTPStore[email];
        console.log(`OTP for ${email} has been deleted`);
      },
      15 * 60 * 1000,
    );

    // const sendMail = async () => {
    //   const response = await mailClient.sendMail({
    //     from: process.env.MAIL_USER as string,
    //     to: email,
    //     subject: "One Time Password for Adding a New Email",
    //     html: otpTemplate,
    //   });
    //   console.log(response);
    // };
    // await sendMail();

    await sendEmail({
      to: email,
      subject: "One Time Password for Adding a New Email",
      html: otpTemplate,
    });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verifyotp(email: string, otp: number) {
  try {
    if (!email || !otp) return false;
    const OTP = OTPStore[email];
    if (OTP === otp) {
      delete OTPStore[email];
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function sendReminderEmail({
  emails,
  preview,
  headerContent,
  mainContent,
}: {
  emails: Email[];
  preview: string;
  headerContent: string;
  mainContent: string[];
}) {
  try {
    if (emails.length === 0) return;
    console.log("sending email");
    const reminderEmailTemplate = render(
      ReminderEmailTemplate({ preview, headerContent, mainContent }),
    );

    // const sendMail = async (email: string) => {
    //   const mailOptions = {
    //     from: process.env.MAIL_USER as string,
    //     to: email,
    //     subject: "Wishly Reminder",
    //     html: reminderEmailTemplate,
    //   };

    //   try {
    //     const response = await mailClient.sendMail(mailOptions);
    //     console.log(`Email sent to ${email}:`, response);
    //   } catch (error) {
    //     console.error(`Failed to send email to ${email}:`, error);
    //   }
    // };

    // const sendAllMailsConcurrently = async (emails: Email[]) => {
    //   const promises = emails.map((email) => sendMail(email.email));

    //   try {
    //     await Promise.all(promises);
    //   } catch (error) {
    //     console.error("One or more emails failed to send:", error);
    //   }
    // };

    // await sendAllMailsConcurrently(emails);
    console.log(emails[0].email);
    await sendEmail({
      to: emails[0].email,
      subject: "Wishly Reminder",
      html: reminderEmailTemplate,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
