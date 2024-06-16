"use server";

import generateOTP from "../generateOtp";
import { mailClient } from "../mail";
import { render } from "@react-email/components";
import OTPEmailTemplate from "@/lib/email-templates/OTPEmailTemplate";

type OTPStoreType = {
  [email: string]: number;
};
const OTPStore: OTPStoreType = {};
export async function sendotp(email: string) {
  try {
    console.log(OTPStore);
    if (!email) return;
    const OTP = generateOTP();
    OTPStore[email] = OTP;
    const otpTemplate = render(
      OTPEmailTemplate({ validationCode: OTP.toString() }),
    );
    await mailClient.sendMail(
      {
        from: process.env.MAIL_USER as string,
        to: email,
        subject: "One Time Password for Adding a New Email",
        // text: `Your OTP for adding a new email is ${OTP}`,
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
