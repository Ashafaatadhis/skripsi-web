import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { resolveUploadPath } from "@/lib/server/uploads";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(_request: Request, context: RouteContext) {
  const { path: uploadPath } = await context.params;
  const filePath = resolveUploadPath(uploadPath);

  if (!filePath) {
    return NextResponse.json({ message: "Invalid upload path." }, { status: 400 });
  }

  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    const buffer = await readFile(filePath);
    const contentType = contentTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  } catch {
    return NextResponse.json({ message: "File not found." }, { status: 404 });
  }
}
