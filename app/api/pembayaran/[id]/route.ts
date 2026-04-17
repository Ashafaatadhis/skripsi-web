import { NextResponse } from "next/server";

import { PaymentStatus } from "@/generated/prisma/client";
import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFiles, getString, getStringArray, normalizeUploadUrls, saveUploadedFiles } from "@/lib/server/uploads";
import { syncRentalPaidUntil } from "@/lib/server/rentals";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

export async function PATCH(request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const statusValue = getString(formData, "status");
  const status = Object.values(PaymentStatus).find((item) => item === statusValue);
  const note = getString(formData, "note");
  const existingProofImageUrls = getStringArray(formData, "existingProofImageUrls");
  const uploadedProofImageUrls = await saveUploadedFiles(getFiles(formData, "proofImages"), "payments");
  const proofImageUrls = normalizeUploadUrls([...existingProofImageUrls, ...uploadedProofImageUrls]);

  if (!status) {
    return NextResponse.json({ message: "Status pembayaran tidak valid." }, { status: 400 });
  }

  const existing = await prisma.payment.findFirst({
    where: {
      id,
      rental: {
        room: {
          kosan: {
            ownerId: owner.id,
          },
        },
      },
    },
    select: {
      id: true,
      rentalId: true,
      paidAt: true,
    },
  });

  if (!existing) {
    return NextResponse.json({ message: "Data pembayaran tidak ditemukan." }, { status: 404 });
  }

  const updated = await prisma.payment.update({
    where: { id: existing.id },
    data: {
      status,
      note: note || null,
      images: {
        deleteMany: {},
        create: proofImageUrls.map((url) => ({ url })),
      },
      paidAt: status === PaymentStatus.paid ? existing.paidAt ?? new Date() : null,
    },
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

  await syncRentalPaidUntil(existing.rentalId);

  const refreshed = await prisma.payment.findUnique({
    where: { id: existing.id },
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

  return NextResponse.json({ payment: mapPayment(refreshed ?? updated) });
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Penghapusan pembayaran dari dashboard dinonaktifkan." },
    { status: 405 },
  );
}
