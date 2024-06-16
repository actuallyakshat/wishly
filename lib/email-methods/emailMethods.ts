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
    console.log(process.env.MAIL_USER);
    console.log(process.env.MAIL_PASS);
    console.log(process.env.MAIL_HOST);
    console.log(OTPStore);
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

    await mailClient.sendMail(
      {
        from: process.env.MAIL_USER as string,
        to: email,
        subject: "One Time Password for Adding a New Email",
        html: otpTemplate,
      },
      (err, message) => {
        console.log(err || message);
      },
    );
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
    await Promise.all(
      emails.map((email) =>
        mailClient.sendMail(
          {
            from: process.env.MAIL_USER as string,
            to: email.email,
            subject: "Wishly Reminder",
            html: reminderEmailTemplate,
          },
          (err, message) => {
            console.log(err || message);
          },
        ),
      ),
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
