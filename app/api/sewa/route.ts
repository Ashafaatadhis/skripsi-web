import { NextResponse } from "next/server";

import { RentalStatus } from "@/generated/prisma/client";
import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

function mapRental(rental: {
  id: string;
  humanId: string;
  startDate: Date;
  paidUntil: Date | null;
  checkoutDate: Date | null;
  monthlyPriceSnapshot: number;
  status: RentalStatus;
  note: string | null;
  room: { id: string; humanId: string; name: string; kosan: { name: string } };
  tenant: { id: string; name: string; phone: string | null };
  _count: { payments: number };
}) {
  return {
    id: rental.id,
    humanId: rental.humanId,
    roomId: rental.room.id,
    roomHumanId: rental.room.humanId,
    roomName: rental.room.name,
    kosanName: rental.room.kosan.name,
    tenantId: rental.tenant.id,
    tenantName: rental.tenant.name,
    tenantPhone: rental.tenant.phone,
    startDate: rental.startDate.toISOString(),
    paidUntil: rental.paidUntil?.toISOString() ?? null,
    checkoutDate: rental.checkoutDate?.toISOString() ?? null,
    monthlyPriceSnapshot: rental.monthlyPriceSnapshot,
    status: rental.status,
    note: rental.note,
    paymentsCount: rental._count.payments,
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
            { humanId: { contains: rawQuery, mode: "insensitive" as const } },
            { tenant: { name: { contains: rawQuery, mode: "insensitive" as const } } },
            { tenant: { phone: { contains: rawQuery, mode: "insensitive" as const } } },
            { room: { name: { contains: rawQuery, mode: "insensitive" as const } } },
            { room: { kosan: { name: { contains: rawQuery, mode: "insensitive" as const } } } },
          ],
        }
      : {}),
  };

  const total = await prisma.rental.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(safePage, totalPages);

  const rentals = await prisma.rental.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      room: {
        select: {
          id: true,
          humanId: true,
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
    rentals: rentals.map(mapRental),
    meta: {
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      q: rawQuery,
    },
  });
}

export async function POST() {
  return NextResponse.json(
    { message: "Pembuatan sewa dilakukan lewat bot tenant." },
    { status: 405 },
  );
}
