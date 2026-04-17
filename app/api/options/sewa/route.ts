import { NextResponse } from "next/server";

import { RentalStatus } from "@/generated/prisma/client";
import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const rentals = await prisma.rental.findMany({
    where: {
      status: {
        in: [RentalStatus.active, RentalStatus.checked_out],
      },
      room: {
        kosan: {
          ownerId: owner.id,
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
        },
      },
      room: {
        select: {
          id: true,
          name: true,
          kosan: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    rentals: rentals.map((rental) => ({
      id: rental.id,
      humanId: rental.humanId,
      tenantName: rental.tenant.name,
      roomName: rental.room.name,
      kosanName: rental.room.kosan.name,
      label: `${rental.humanId} • ${rental.tenant.name} • ${rental.room.name} • ${rental.room.kosan.name}`,
    })),
  });
}
