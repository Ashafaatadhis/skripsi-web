import { NextResponse } from "next/server";

import { PaymentStatus } from "@/generated/prisma/enums";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFiles, getString, getStringArray, saveUploadedFiles } from "@/lib/server/uploads";

const PAGE_SIZE = 10;

function mapPayment(payment: {
  id: string;
  amount: number;
  dueDate: Date;
  paidAt: Date | null;
  status: PaymentStatus;
  note: string | null;
  proofImageUrls: string[];
  booking: {
    id: string;
    tenant: { name: string };
    room: {
      name: string;
      kosan: { name: string };
    };
  };
}) {
  return {
    id: payment.id,
    amount: payment.amount,
    dueDate: payment.dueDate.toISOString(),
    paidAt: payment.paidAt?.toISOString() ?? null,
    status: payment.status,
    note: payment.note,
    proofImageUrls: payment.proofImageUrls,
    bookingId: payment.booking.id,
    tenantName: payment.booking.tenant.name,
    roomName: payment.booking.room.name,
    kosanName: payment.booking.room.kosan.name,
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
    booking: {
      room: {
        kosan: {
          ownerId: owner.id,
        },
      },
      ...(rawQuery
        ? {
            OR: [
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
    orderBy: [{ dueDate: "desc" }, { createdAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      booking: {
        select: {
          id: true,
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

export async function POST(request: Request) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const bookingId = getString(formData, "bookingId");
  const amount = Number(getString(formData, "amount"));
  const dueDateValue = getString(formData, "dueDate");
  const dueDate = dueDateValue ? new Date(dueDateValue) : null;
  const statusValue = getString(formData, "status");
  const status = Object.values(PaymentStatus).find((item) => item === statusValue);
  const note = getString(formData, "note");
  const existingProofImageUrls = getStringArray(formData, "existingProofImageUrls");
  const uploadedProofImageUrls = await saveUploadedFiles(getFiles(formData, "proofImages"), "payments");
  const proofImageUrls = [...existingProofImageUrls, ...uploadedProofImageUrls];

  if (!bookingId || !Number.isFinite(amount) || amount <= 0 || !dueDate || Number.isNaN(dueDate.getTime())) {
    return NextResponse.json(
      { message: "Booking, nominal, dan jatuh tempo wajib diisi dengan benar." },
      { status: 400 }
    );
  }

  if (!status || !Object.values(PaymentStatus).includes(status)) {
    return NextResponse.json({ message: "Status pembayaran tidak valid." }, { status: 400 });
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      room: {
        kosan: {
          ownerId: owner.id,
        },
      },
    },
    select: { id: true },
  });

  if (!booking) {
    return NextResponse.json({ message: "Booking tidak ditemukan." }, { status: 404 });
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: Math.round(amount),
      dueDate,
      status,
      note: note || null,
      proofImageUrls,
      paidAt: status === PaymentStatus.paid ? new Date() : null,
    },
    include: {
      booking: {
        select: {
          id: true,
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

  return NextResponse.json({ payment: mapPayment(payment) }, { status: 201 });
}
