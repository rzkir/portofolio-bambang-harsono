import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

import Contact from "@/models/Contact";

import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { contactId, replyMessage, adminEmail } = body;

    if (!contactId || !replyMessage || !adminEmail) {
      return NextResponse.json(
        { error: "Contact ID, reply message, and admin email are required" },
        { status: 400 }
      );
    }

    // Find the original contact
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Create email transporter with support for multiple services
    const emailService = process.env.EMAIL_SERVICE || "gmail";
    const emailUser = process.env.EMAIL_USER || adminEmail;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailPass) {
      return NextResponse.json(
        {
          error:
            "Email password not configured. Please check your environment variables.",
        },
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

    // Email content with better formatting
    const mailOptions = {
      from: emailUser,
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Reply to your message</h2>
            <p style="color: #666; margin-bottom: 0;">Thank you for contacting us. Here's our response:</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #007bff; font-size: 16px;">Original Message:</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.5;">${
              contact.message
            }</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #28a745; font-size: 16px;">Our Reply:</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.5;">${replyMessage}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">This is an automated reply from your portfolio contact form.</p>
            <p style="margin: 5px 0 0 0;">Sent on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
Reply to your message

Original Message:
${contact.message}

Our Reply:
${replyMessage}

---
This is an automated reply from your portfolio contact form.
Sent on ${new Date().toLocaleString()}
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);

      // Update contact status to replied
      contact.status = "replied";
      contact.updatedAt = new Date();
      await contact.save();

      return NextResponse.json({
        message: "Reply sent successfully",
        contact: {
          id: contact._id,
          status: contact.status,
          updatedAt: contact.updatedAt,
        },
      });
    } catch (emailError: unknown) {
      console.error("Email sending error:", emailError);

      // Provide specific error messages
      let errorMessage = "Email delivery failed";
      if (
        emailError &&
        typeof emailError === "object" &&
        "code" in emailError
      ) {
        if (emailError.code === "EAUTH") {
          errorMessage =
            "Email authentication failed. Please check your email credentials.";
        } else if (emailError.code === "ECONNECTION") {
          errorMessage =
            "Email connection failed. Please check your internet connection.";
        } else if (emailError.code === "ETIMEDOUT") {
          errorMessage = "Email connection timed out. Please try again.";
        }
      }

      // If email fails, still update the status but inform about the error
      contact.status = "replied";
      contact.updatedAt = new Date();
      await contact.save();

      return NextResponse.json({
        message:
          "Reply saved but email delivery failed. Please check your email configuration.",
        contact: {
          id: contact._id,
          status: contact.status,
          updatedAt: contact.updatedAt,
        },
        emailError: errorMessage,
      });
    }
  } catch (error) {
    console.error("Send reply error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
