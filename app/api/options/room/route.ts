import { NextResponse } from "next/server";

import { BookingStatus } from "@/generated/prisma/enums";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const rooms = await prisma.room.findMany({
    where: {
      kosan: {
        ownerId: owner.id,
      },
    },
    orderBy: [{ kosan: { name: "asc" } }, { name: "asc" }],
    include: {
      kosan: {
        select: {
          id: true,
          name: true,
        },
      },
      bookings: {
        where: {
          status: BookingStatus.active,
        },
        select: {
          id: true,
        },
      },
    },
  });

  return NextResponse.json({
    rooms: rooms.map((room) => {
      const bookedCount = room.bookings.length;
      const availableQuantity = Math.max(room.quantity - bookedCount, 0);

      return {
        id: room.id,
        name: room.name,
        kosanId: room.kosan.id,
        kosanName: room.kosan.name,
        quantity: room.quantity,
        bookedCount,
        availableQuantity,
        label: `${room.name} • ${room.kosan.name} • sisa ${availableQuantity}`,
      };
    }),
  });
}
