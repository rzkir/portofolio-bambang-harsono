import { NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

import TechSkill from "@/models/TechSkill";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const techSkills = await TechSkill.find().sort({ createdAt: -1 });
    return NextResponse.json(techSkills);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tech skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const techSkill = new TechSkill(body);
    await techSkill.save();

    return NextResponse.json(techSkill);
  } catch {
    return NextResponse.json(
      { error: "Failed to create tech skill" },
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

    const techSkill = await TechSkill.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!techSkill) {
      return NextResponse.json(
        { error: "Tech skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(techSkill);
  } catch {
    return NextResponse.json(
      { error: "Failed to update tech skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const techSkill = await TechSkill.findByIdAndDelete(id);
    if (!techSkill) {
      return NextResponse.json(
        { error: "Tech skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Tech skill deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete tech skill" },
      { status: 500 }
    );
  }
}
