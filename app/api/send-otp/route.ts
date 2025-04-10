import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID!;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ success: false, error: "Le numéro est requis." }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const message = await client.messages.create({
      body: `Votre code de vérification est : ${otp}`,
      messagingServiceSid,
      to: phoneNumber,
    });

    console.log("✅ OTP envoyé :", otp, "| SID:", message.sid);
    return NextResponse.json({ success: true, otp }); // ✅ Remove otp before production
  } catch (error: any) {
    console.error("❌ Twilio Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
