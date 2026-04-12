import { NextResponse } from "next/server";

import { BookingStatus } from "@/generated/prisma/enums";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

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

export async function GET(request: Request) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("q")?.trim() ?? "";
  const pageParam = Number(searchParams.get("page") ?? "1");
  const safePage = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;

  const where = {
    room: {
      kosan: {
        ownerId: owner.id,
      },
    },
    ...(rawQuery
      ? {
          OR: [
            { tenant: { name: { contains: rawQuery, mode: "insensitive" as const } } },
            { tenant: { phone: { contains: rawQuery, mode: "insensitive" as const } } },
            { room: { name: { contains: rawQuery, mode: "insensitive" as const } } },
            { room: { kosan: { name: { contains: rawQuery, mode: "insensitive" as const } } } },
          ],
        }
      : {}),
  };

  const total = await prisma.booking.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(safePage, totalPages);

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      room: {
        select: {
          id: true,
          name: true,
          kosan: {
            select: {
              name: true,
            },
          },
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

  return NextResponse.json({
    bookings: bookings.map(mapBooking),
    meta: {
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      q: rawQuery,
    },
  });
}

export async function POST(request: Request) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

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

  const tenant = await prisma.tenant.create({
    data: {
      name: tenantName,
      phone: tenantPhone || null,
    },
    select: { id: true },
  });

  const booking = await prisma.booking.create({
    data: {
      roomId: room.id,
      tenantId: tenant.id,
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

  return NextResponse.json({ booking: mapBooking(booking) }, { status: 201 });
}
