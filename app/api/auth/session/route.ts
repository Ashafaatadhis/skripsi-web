import { NextResponse } from "next/server";

import { getCurrentOwner } from "@/lib/auth";

export async function GET() {
  const owner = await getCurrentOwner();

  return NextResponse.json({ owner });
}
