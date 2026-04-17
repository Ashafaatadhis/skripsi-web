import { NextResponse } from "next/server";

import { PaymentStatus } from "@/generated/prisma/client";
import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeUploadUrls } from "@/lib/server/uploads";

const PAGE_SIZE = 10;

type PaymentWithRelations = {
  id: string;
  humanId: string;
  amount: number;
  monthsPaid: number;
  periodStart: Date;
  periodEnd: Date;
  paidAt: Date | null;
  status: PaymentStatus;
  note: string | null;
  images: Array<{ url: string }>;
  rental: {
    id: string;
    humanId: string;
    paidUntil: Date | null;
    tenant: { name: string };
    room: {
      name: string;
      kosan: { name: string };
    };
  };
};

function mapPayment(payment: PaymentWithRelations) {
  return {
    id: payment.id,
    humanId: payment.humanId,
    rentalId: payment.rental.id,
    rentalHumanId: payment.rental.humanId,
    amount: payment.amount,
    monthsPaid: payment.monthsPaid,
    periodStart: payment.periodStart.toISOString(),
    periodEnd: payment.periodEnd.toISOString(),
    paidAt: payment.paidAt?.toISOString() ?? null,
    status: payment.status,
    note: payment.note,
    proofImageUrls: normalizeUploadUrls(payment.images.map((img) => img.url)),
    paidUntil: payment.rental.paidUntil?.toISOString() ?? null,
    tenantName: payment.rental.tenant.name,
    roomName: payment.rental.room.name,
    kosanName: payment.rental.room.kosan.name,
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
    rental: {
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
              { room: { name: { contains: rawQuery, mode: "insensitive" as const } } },
              { room: { kosan: { name: { contains: rawQuery, mode: "insensitive" as const } } } },
            ],
          }
        : {}),
    },
    ...(rawQuery
      ? {
          OR: [{ note: { contains: rawQuery, mode: "insensitive" as const } }],
        }
      : {}),
  };

  const total = await prisma.payment.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(safePage, totalPages);

  const payments = await prisma.payment.findMany({
    where,
    orderBy: [{ periodStart: "desc" }, { createdAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      images: true,
      rental: {
        select: {
          id: true,
          humanId: true,
          paidUntil: true,
          tenant: { select: { name: true } },
          room: {
            select: {
              name: true,
              kosan: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    payments: payments.map(mapPayment),
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
    { message: "Pembuatan tagihan dilakukan lewat bot tenant." },
    { status: 405 },
  );
}
