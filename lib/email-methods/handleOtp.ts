"use server";

import generateOTP from "../generateOtp";
import { mailClient } from "../mail";

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
    await mailClient.send(
      {
        from: process.env.MAIL_USER as string,
        to: email,
        subject: "OTP for Adding an Email",
        text: `Your OTP is ${OTP}`,
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
