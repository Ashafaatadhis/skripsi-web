import { NextResponse } from "next/server";

import { PaymentStatus } from "@/generated/prisma/enums";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFiles, getString, getStringArray, saveUploadedFiles } from "@/lib/server/uploads";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

export async function PATCH(request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
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

  const existing = await prisma.payment.findFirst({
    where: {
      id,
      booking: {
        room: {
          kosan: {
            ownerId: owner.id,
          },
        },
      },
    },
    select: { id: true, paidAt: true },
  });

  if (!existing) {
    return NextResponse.json({ message: "Data pembayaran tidak ditemukan." }, { status: 404 });
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

  const updated = await prisma.payment.update({
    where: { id: existing.id },
    data: {
      bookingId: booking.id,
      amount: Math.round(amount),
      dueDate,
      status,
      note: note || null,
      proofImageUrls,
      paidAt: status === PaymentStatus.paid ? existing.paidAt ?? new Date() : null,
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

  return NextResponse.json({ payment: mapPayment(updated) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  const payment = await prisma.payment.findFirst({
    where: {
      id,
      booking: {
        room: {
          kosan: {
            ownerId: owner.id,
          },
        },
      },
    },
    select: { id: true },
  });

  if (!payment) {
    return NextResponse.json({ message: "Data pembayaran tidak ditemukan." }, { status: 404 });
  }

  await prisma.payment.delete({ where: { id: payment.id } });

  return NextResponse.json({ success: true });
}
