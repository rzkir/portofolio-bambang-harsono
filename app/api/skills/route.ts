import { NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

import Skill from "@/models/Skill";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const skills = await Skill.find().sort({ createdAt: -1 });
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const skill = new Skill(body);
    await skill.save();

    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: "Failed to create skill" },
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

    const skill = await Skill.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
