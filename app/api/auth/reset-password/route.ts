import { NextResponse } from "next/server";

import { Account } from "@/models/Account";

import { generateJWT } from "@/utils/auth/token";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    await connectToDatabase();

    const account = await Account.findOne({ email });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    account.resetToken = otp;
    account.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await account.save();

    const emailService = process.env.EMAIL_SERVICE;
    const emailUser = process.env.EMAIL_ADMIN;
    const emailPass = process.env.EMAIL_PASS_ADMIN;

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const subject = "Your Password Reset Code";
    const html = `
      <!doctype html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Password Reset Code</title>
        <!--[if mso]>
        <style type="text/css">
          body, table, td {font-family: Arial, sans-serif !important;}
        </style>
        <![endif]-->
      </head>
      <body style="margin:0; padding:0; background-color:#0b1220;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0b1220;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)); border:1px solid rgba(255,255,255,0.08); border-radius:16px;">
                <tr>
                  <td align="center" style="padding:32px 24px 16px 24px;">
                    <div style="height:48px; width:48px; border-radius:12px; background:#e6f0ff; color:#1e40af; display:inline-block; text-align:center; line-height:48px; font-weight:700; font-family:Arial, sans-serif; font-size:24px;">🔒</div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:8px 24px;">
                    <h1 style="margin:0; font-family:Arial, sans-serif; font-size:22px; line-height:1.3; color:#ffffff;">Verify your password reset</h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:8px 24px 16px;">
                    <p style="margin:0; font-family:Arial, sans-serif; font-size:14px; line-height:1.6; color:#c9d2f0;">Use the 6‑digit code below to reset your password.</p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:16px 24px 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:10px;">
                      <tr>
                        ${otp
                          .split("")
                          .map(
                            (d) => `
                              <td align="center" style="height:56px; width:48px; border-radius:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);">
                                <div style="font-family:Arial, sans-serif; font-size:24px; color:#ffffff; font-weight:700; letter-spacing:1px; line-height:56px;">${d}</div>
                              </td>
                            `
                          )
                          .join("")}
                    </tr>
                    </table>
                    
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:0 24px 6px;">
                    <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#9aa4c7;">This code expires in 10 minutes.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 24px 24px;">
                    <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#7781a5;">If you didn’t request this, you can safely ignore this email.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                <tr>
                  <td align="center" style="padding:16px 8px;">
                    <p style="margin:0; font-family:Arial, sans-serif; font-size:11px; color:#6b7280;">© ${new Date().getFullYear()} — Password reset security</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
    const text = `Your password reset OTP is: ${otp}. It expires in 10 minutes.`;

    await transporter.sendMail({
      from: emailUser,
      to: account.email,
      subject,
      html,
      text,
    });

    return NextResponse.json({
      message: "OTP sent to your email if the account exists.",
    });
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    await connectToDatabase();

    const account = await Account.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Update password
    account.password = newPassword;
    account.resetToken = undefined;
    account.resetTokenExpiry = undefined;
    await account.save();

    // Generate new JWT token
    const jwtToken = await generateJWT({
      _id: account._id,
      email: account.email,
      role: account.role,
    });

    const response = NextResponse.json({
      message: "Password reset successful",
    });

    response.cookies.set({
      name: "token",
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
