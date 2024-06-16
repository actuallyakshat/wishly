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

    const sendMail = async (email: Email) => {
      const response = await mailClient.sendMail({
        from: process.env.MAIL_USER as string,
        to: email.email,
        subject: "Wishly Reminder",
        html: reminderEmailTemplate,
      });
      console.log(response);
    };
    const sendAllMails = async (emails: Email[]) => {
      await Promise.all(emails.map((email) => sendMail(email)));
    };
    await sendAllMails(emails);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
