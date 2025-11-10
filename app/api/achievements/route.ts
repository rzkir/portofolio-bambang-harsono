import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

import Achievement from "@/models/Achievement";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    return NextResponse.json(achievements);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const achievement = new Achievement(body);
    await achievement.save();

    revalidatePath("/sitemap.xml");
    return NextResponse.json(achievement);
  } catch {
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("Updated achievement:", achievement);

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    revalidatePath("/sitemap.xml");
    return NextResponse.json(achievement);
  } catch {
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    revalidatePath("/sitemap.xml");
    return NextResponse.json({ message: "Achievement deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
