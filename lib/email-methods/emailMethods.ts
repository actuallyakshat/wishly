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
    const extractedIds = emails.map((email) => email.email);
    console.log("sending email");
    const reminderEmailTemplate = render(
      ReminderEmailTemplate({ preview, headerContent, mainContent }),
    );

    await sendEmail({
      from: process.env.MAIL_USER,
      //@ts-ignore
      to: extractedIds,
      subject: "Wishly Reminder",
      html: reminderEmailTemplate,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function testEmail() {
  try {
    await sendEmail({
      //@ts-ignore
      to: ["akshatdubey0808@gmail.com", "actuallyakshat@gmail.com"],
      subject: "Testing",
      html: "<h1>Testing</h1>",
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
