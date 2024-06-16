"use server";

import generateOTP from "../generateOtp";
import { mailClient } from "../mail";
import { render } from "@react-email/components";
import OTPEmailTemplate from "@/lib/email-templates/OTPEmailTemplate";
import ReminderEmailTemplate from "../email-templates/ReminderTemplate";
import { Email } from "@prisma/client";

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

    const sendMail = async () => {
      const response = await mailClient.sendMail({
        from: process.env.MAIL_USER as string,
        to: email,
        subject: "One Time Password for Adding a New Email",
        html: otpTemplate,
      });
      console.log(response);
    };
    await sendMail();
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
    const reminderEmailTemplate = render(
      ReminderEmailTemplate({ preview, headerContent, mainContent }),
    );

    // const sendMail = async (email: Email) => {
    //   const response = await mailClient.sendMail({
    //     from: process.env.MAIL_USER as string,
    //     to: email.email,
    //     subject: "Wishly Reminder",
    //     html: reminderEmailTemplate,
    //   });
    //   console.log(response);
    // };
    // for (const email of emails) {
    //   await sendMail(email);
    // }

    const sendMail = (email: Email) => {
      return new Promise((resolve, reject) => {
        const mailData = {
          from: process.env.MAIL_USER as string,
          to: email.email,
          subject: `Wishly Reminder`,
          html: reminderEmailTemplate,
        };

        mailClient.sendMail(mailData, (err, info) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(info);
            resolve(info);
          }
        });
      });
    };

    const sendAllMailsConcurrently = async (emails: Email[]) => {
      const promises = emails.map((email) => sendMail(email));

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error("One or more emails failed to send:", error);
      }
    };

    await sendAllMailsConcurrently(emails);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
