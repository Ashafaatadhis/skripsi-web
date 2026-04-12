import { NextResponse } from "next/server";

import { BookingStatus } from "@/generated/prisma/enums";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function mapBooking(booking: {
  id: string;
  startDate: Date;
  endDate: Date | null;
  status: BookingStatus;
  note: string | null;
  room: { id: string; name: string; kosan: { name: string } };
  tenant: { id: string; name: string; phone: string | null };
  _count: { payments: number };
}) {
  return {
    id: booking.id,
    roomId: booking.room.id,
    roomName: booking.room.name,
    kosanName: booking.room.kosan.name,
    tenantId: booking.tenant.id,
    tenantName: booking.tenant.name,
    tenantPhone: booking.tenant.phone,
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate?.toISOString() ?? null,
    status: booking.status,
    note: booking.note,
    paymentsCount: booking._count.payments,
  };
}

export async function PATCH(request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    roomId?: string;
    tenantName?: string;
    tenantPhone?: string;
    startDate?: string;
    endDate?: string;
    status?: BookingStatus;
    note?: string;
  } | null;

  const roomId = body?.roomId?.trim() ?? "";
  const tenantName = body?.tenantName?.trim() ?? "";
  const tenantPhone = body?.tenantPhone?.trim() ?? "";
  const startDateValue = body?.startDate?.trim() ?? "";
  const endDateValue = body?.endDate?.trim() ?? "";
  const startDate = startDateValue ? new Date(startDateValue) : null;
  const endDate = endDateValue ? new Date(endDateValue) : null;
  const status = body?.status;
  const note = body?.note?.trim() ?? "";

  if (!roomId || !tenantName || !startDate || Number.isNaN(startDate.getTime())) {
    return NextResponse.json(
      { message: "Kamar, nama tenant, dan tanggal mulai wajib diisi dengan benar." },
      { status: 400 }
    );
  }

  if (endDate && Number.isNaN(endDate.getTime())) {
    return NextResponse.json({ message: "Tanggal selesai tidak valid." }, { status: 400 });
  }

  if (!status || !Object.values(BookingStatus).includes(status)) {
    return NextResponse.json({ message: "Status booking tidak valid." }, { status: 400 });
  }

  const existing = await prisma.booking.findFirst({
    where: {
      id,
      room: {
        kosan: {
          ownerId: owner.id,
        },
      },
    },
    select: {
      id: true,
      tenantId: true,
      roomId: true,
    },
  });

  if (!existing) {
    return NextResponse.json({ message: "Data booking tidak ditemukan." }, { status: 404 });
  }

  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      kosan: {
        ownerId: owner.id,
      },
    },
    include: {
      bookings: {
        where: {
          status: BookingStatus.active,
          id: {
            not: existing.id,
          },
        },
        select: { id: true },
      },
    },
  });

  if (!room) {
    return NextResponse.json({ message: "Kamar tidak ditemukan." }, { status: 404 });
  }

  if (status === BookingStatus.active && room.bookings.length >= room.quantity) {
    return NextResponse.json({ message: "Kamar ini sudah penuh." }, { status: 400 });
  }

  await prisma.tenant.update({
    where: { id: existing.tenantId },
    data: {
      name: tenantName,
      phone: tenantPhone || null,
    },
  });

  const updated = await prisma.booking.update({
    where: { id: existing.id },
    data: {
      roomId: room.id,
      startDate,
      endDate,
      status,
      note: note || null,
    },
    include: {
      room: {
        select: {
          id: true,
          name: true,
          kosan: { select: { name: true } },
        },
      },
      tenant: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
      _count: {
        select: {
          payments: true,
        },
      },
    },
  });

  return NextResponse.json({ booking: mapBooking(updated) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  const booking = await prisma.booking.findFirst({
    where: {
      id,
      room: {
        kosan: {
          ownerId: owner.id,
        },
      },
    },
    include: {
      _count: {
        select: {
          payments: true,
        },
      },
    },
  });

  if (!booking) {
    return NextResponse.json({ message: "Data booking tidak ditemukan." }, { status: 404 });
  }

  if (booking._count.payments > 0) {
    return NextResponse.json(
      { message: "Booking yang sudah punya pembayaran belum bisa dihapus." },
      { status: 400 }
    );
  }

  await prisma.booking.delete({ where: { id: booking.id } });

  return NextResponse.json({ success: true });
}
