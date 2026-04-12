import { NextResponse } from "next/server";

import { BookingStatus } from "@/generated/prisma/enums";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      status: {
        in: [BookingStatus.active, BookingStatus.completed],
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
    bookings: bookings.map((booking) => ({
      id: booking.id,
      tenantName: booking.tenant.name,
      roomName: booking.room.name,
      kosanName: booking.room.kosan.name,
      label: `${booking.tenant.name} • ${booking.room.name} • ${booking.room.kosan.name}`,
    })),
  });
}
