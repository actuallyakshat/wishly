"use server";

import generateOTP from "../generateOtp";
import { transporter } from "../mail-transporter";

type OTPStoreType = {
  [email: string]: number;
};

const OTPStore: OTPStoreType = {};
export async function sendotp(email: string) {
  try {
    if (!email) return;
    const OTP = generateOTP();
    OTPStore[email] = OTP;
    console.log("i am called and I am sending email");
    const { response } = await transporter.sendMail({
      from: "akshatdubey0808@gmail.com",
      to: email,
      subject: "testing otp",
      html: `<p>Hi, ${email}!</p><p>Your OTP is ${OTP}</p>`,
    });
    console.log(response);
    return;
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
