import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

import Gallery from "@/models/Gallery";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(galleries);
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

    const gallery = new Gallery(body);
    await gallery.save();

    revalidatePath("/sitemap.xml");
    return NextResponse.json(gallery);
  } catch {
    return NextResponse.json(
      { error: "Failed to create gallery" },
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

    const gallery = await Gallery.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("Updated gallery:", gallery);

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    revalidatePath("/sitemap.xml");
    return NextResponse.json(gallery);
  } catch {
    return NextResponse.json(
      { error: "Failed to update gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const gallery = await Gallery.findByIdAndDelete(id);
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    revalidatePath("/sitemap.xml");
    return NextResponse.json({ message: "Gallery deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete gallery" },
      { status: 500 }
    );
  }
}
