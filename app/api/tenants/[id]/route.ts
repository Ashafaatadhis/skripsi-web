import { NextResponse } from "next/server";

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
  const body = (await request.json()) as { name?: string; phone?: string };

  const existing = await prisma.tenant.findFirst({
    where: {
      id,
      rentals: {
        some: {
          room: { kosan: { ownerId: owner.id } },
        },
      },
    },
  });

  if (!existing) {
    return NextResponse.json({ message: "Penyewa tidak ditemukan." }, { status: 404 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();

  if (!name) {
    return NextResponse.json({ message: "Nama penyewa wajib diisi." }, { status: 400 });
  }

  const updated = await prisma.tenant.update({
    where: { id: existing.id },
    data: {
      name,
      phone: phone || null,
    },
  });

  return NextResponse.json({
    tenant: {
      id: updated.id,
      telegramId: updated.telegramId,
      name: updated.name,
      phone: updated.phone,
    },
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  const existing = await prisma.tenant.findFirst({
    where: {
      id,
      rentals: {
        some: {
          room: { kosan: { ownerId: owner.id } },
        },
      },
    },
    include: {
      rentals: {
        where: { status: "active" },
        select: { id: true },
      },
    },
  });

  if (!existing) {
    return NextResponse.json({ message: "Penyewa tidak ditemukan." }, { status: 404 });
  }

  if (existing.rentals.length > 0) {
    return NextResponse.json(
      { message: "Tidak bisa hapus penyewa yang masih punya sewa aktif. Akhiri sewa dulu." },
      { status: 400 },
    );
  }

  await prisma.tenant.delete({ where: { id: existing.id } });

  return NextResponse.json({ message: "Penyewa berhasil dihapus." });
}
