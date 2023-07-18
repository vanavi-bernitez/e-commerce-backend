import twilio from "twilio";
import "dotenv/config";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (phoneNumber, codeOTP) => {
  try {
    await client.messages.create({
      from: "+18149628525",
      to: phoneNumber,
      body: `Your OTP code is: ${codeOTP}`,
    });
  } catch (error) {
    throw new Error('An error occurred while sending OTP.');
  }
};

export { sendOTP };
