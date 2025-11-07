import { NextResponse } from "next/server";

import { Account } from "@/models/Account";

import { generateJWT } from "@/utils/auth/token";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await connectToDatabase();

    // Find account
    const account = await Account.findOne({ email });
    if (!account) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await account.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = await generateJWT({
      _id: account._id,
      email: account.email,
      role: account.role,
    });

    // Set cookie
    const response = NextResponse.json(
      {
        message: "Sign in successful",
        user: {
          _id: account._id,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          role: account.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: unknown) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
