import { NextResponse } from "next/server";

import { Home } from "@/models/Home";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const contents = await Home.find().sort({ createdAt: -1 });
    return NextResponse.json(contents);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch contents" },
      { status: 500 }
    );
  }
}

// POST new home content
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const content = await Home.create(body);
    return NextResponse.json(content, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}

// PUT update home content
export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, ...updateData } = body;

    const content = await Home.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch {
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}

// DELETE home content
export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const content = await Home.findByIdAndDelete(id);

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    );
  }
}
