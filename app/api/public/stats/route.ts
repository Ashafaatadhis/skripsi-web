import { NextResponse } from "next/server";

import { RentalStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [activeTenants, kosanCount] = await Promise.all([
    prisma.rental.count({
      where: { status: RentalStatus.active },
    }),
    prisma.kosan.count(),
  ]);

  return NextResponse.json({
    activeTenants,
    kosanCount,
  });
}
