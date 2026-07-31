import { NextResponse } from "next/server";

import { RentalStatus } from "@/generated/prisma/client";
import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { status?: string; note?: string };

  const existing = await prisma.rental.findFirst({
    where: {
      id,
      room: { kosan: { ownerId: owner.id } },
    },
    select: { id: true, status: true },
  });

  if (!existing) {
    return NextResponse.json({ message: "Data sewa tidak ditemukan." }, { status: 404 });
  }

  const status = body.status as RentalStatus | undefined;
  const note = body.note?.trim();

  const data: { status?: RentalStatus; note?: string | null; checkoutDate?: Date | null } = {};

  if (status && Object.values(RentalStatus).includes(status)) {
    data.status = status;
    if (status === "checked_out") {
      data.checkoutDate = new Date();
    }
  }

  if (note !== undefined) {
    data.note = note || null;
  }

  const updated = await prisma.rental.update({
    where: { id: existing.id },
    data,
    include: {
      room: {
        select: {
          id: true,
          humanId: true,
          name: true,
          kosan: { select: { name: true } },
        },
      },
      tenant: {
        select: { id: true, name: true, phone: true },
      },
      _count: { select: { payments: true } },
    },
  });

  return NextResponse.json({
    rental: {
      id: updated.id,
      humanId: updated.humanId,
      roomId: updated.room.id,
      roomHumanId: updated.room.humanId,
      roomName: updated.room.name,
      kosanName: updated.room.kosan.name,
      tenantId: updated.tenant.id,
      tenantName: updated.tenant.name,
      tenantPhone: updated.tenant.phone,
      startDate: updated.startDate.toISOString(),
      paidUntil: updated.paidUntil?.toISOString() ?? null,
      checkoutDate: updated.checkoutDate?.toISOString() ?? null,
      monthlyPriceSnapshot: updated.monthlyPriceSnapshot,
      status: updated.status,
      note: updated.note,
      paymentsCount: updated._count.payments,
    },
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  const existing = await prisma.rental.findFirst({
    where: {
      id,
      room: { kosan: { ownerId: owner.id } },
    },
    include: {
      payments: { select: { id: true } },
    },
  });

  if (!existing) {
    return NextResponse.json({ message: "Data sewa tidak ditemukan." }, { status: 404 });
  }

  if (existing.status === "active") {
    return NextResponse.json(
      { message: "Tidak bisa hapus sewa yang masih aktif. Akhiri sewa dulu." },
      { status: 400 },
    );
  }

  if (existing.payments.length > 0) {
    return NextResponse.json(
      { message: "Tidak bisa hapus sewa yang sudah punya riwayat pembayaran." },
      { status: 400 },
    );
  }

  await prisma.rental.delete({ where: { id: existing.id } });

  return NextResponse.json({ message: "Data sewa berhasil dihapus." });
}
