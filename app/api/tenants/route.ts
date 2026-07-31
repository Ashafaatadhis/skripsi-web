import { NextResponse } from "next/server";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

type TenantWithRelations = {
  id: string;
  telegramId: string | null;
  name: string;
  phone: string | null;
  createdAt: Date;
  rentals: Array<{
    id: string;
    humanId: string;
    status: string;
    startDate: Date;
    monthlyPriceSnapshot: number;
    room: {
      name: string;
      kosan: { name: string };
    };
    _count: { payments: number };
  }>;
};

function mapTenant(tenant: TenantWithRelations) {
  const activeRental = tenant.rentals.find((r) => r.status === "active");

  return {
    id: tenant.id,
    telegramId: tenant.telegramId,
    name: tenant.name,
    phone: tenant.phone,
    createdAt: tenant.createdAt.toISOString(),
    activeRental: activeRental
      ? {
          id: activeRental.id,
          humanId: activeRental.humanId,
          roomName: activeRental.room.name,
          kosanName: activeRental.room.kosan.name,
          startDate: activeRental.startDate.toISOString(),
          monthlyPrice: activeRental.monthlyPriceSnapshot,
          paymentsCount: activeRental._count.payments,
        }
      : null,
    totalRentals: tenant.rentals.length,
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
    rentals: {
      some: {
        room: {
          kosan: {
            ownerId: owner.id,
          },
        },
      },
    },
    ...(rawQuery
      ? {
          OR: [
            { name: { contains: rawQuery, mode: "insensitive" as const } },
            { phone: { contains: rawQuery, mode: "insensitive" as const } },
            { telegramId: { contains: rawQuery, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const total = await prisma.tenant.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(safePage, totalPages);

  const tenants = await prisma.tenant.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      rentals: {
        where: {
          room: {
            kosan: {
              ownerId: owner.id,
            },
          },
        },
        orderBy: [{ createdAt: "desc" }],
        select: {
          id: true,
          humanId: true,
          status: true,
          startDate: true,
          monthlyPriceSnapshot: true,
          room: {
            select: {
              name: true,
              kosan: {
                select: { name: true },
              },
            },
          },
          _count: {
            select: { payments: true },
          },
        },
      },
    },
  });

  return NextResponse.json({
    tenants: tenants.map(mapTenant),
    meta: {
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      q: rawQuery,
    },
  });
}
