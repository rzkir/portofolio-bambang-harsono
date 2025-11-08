import { NextResponse } from "next/server";

import imagekit from "@/utils/imagekit/imagekit";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to ImageKit in skills folder
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/skills",
    });

    return NextResponse.json({
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload skill image" },
      { status: 500 }
    );
  }
}
