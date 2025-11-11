import { NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

import { Account } from "@/models/Account";

import { generateJWT } from "@/utils/auth/token";

export const runtime = 'nodejs'

// POST /api/auth/verification
// Body: { token: string, newPassword?: string }
// If only token provided: validate OTP and return 200.
// If newPassword provided: reset password and issue JWT cookie.
export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'OTP token is required' }, { status: 400 });
    }

    await connectToDatabase();

    const account = await Account.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!account) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // If only verifying OTP
    if (!newPassword) {
      return NextResponse.json({ message: 'OTP is valid' });
    }

    // If resetting password as part of verification flow
    account.password = newPassword;
    account.resetToken = undefined;
    account.resetTokenExpiry = undefined;
    await account.save();

    const jwtToken = await generateJWT({
      _id: account._id,
      email: account.email,
      role: account.role,
    });

    const response = NextResponse.json({ message: 'Password reset successful' });
    response.cookies.set({
      name: 'token',
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: unknown) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

