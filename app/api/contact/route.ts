import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

import Contact from "@/models/Contact";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase();

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create new contact
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      status: "unread",
    });

    // Save to database
    await newContact.save();

    return NextResponse.json(
      {
        message: "Message sent successfully! We will contact you soon.",
        contact: {
          id: newContact._id,
          name: newContact.name,
          email: newContact.email,
          subject: newContact.subject,
          createdAt: newContact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);

    // Handle mongoose validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation error. Please check your input." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to database
    await connectToDatabase();

    // Get all contacts (for admin purposes)
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error("Get contacts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
