import { NextResponse } from "next/server";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFiles, getString, getStringArray, saveUploadedFiles } from "@/lib/server/uploads";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function mapRoom(room: {
  id: string;
  humanId: string;
  name: string;
  monthlyPrice: number;
  quantity: number;
  imageUrls: string[];
  bookings: Array<{ id: string }>;
  kosan: { id: string; name: string };
}) {
  const bookedCount = room.bookings.length;
  const availableQuantity = Math.max(room.quantity - bookedCount, 0);

  return {
    id: room.id,
    humanId: room.humanId,
    name: room.name,
    monthlyPrice: room.monthlyPrice,
    quantity: room.quantity,
    imageUrls: room.imageUrls,
    bookedCount,
    availableQuantity,
    kosanId: room.kosan.id,
    kosanName: room.kosan.name,
  };
}

export async function PATCH(request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const kosanId = getString(formData, "kosanId");
  const name = getString(formData, "name");
  const monthlyPrice = Number(getString(formData, "monthlyPrice"));
  const quantity = Number(getString(formData, "quantity"));
  const existingImageUrls = getStringArray(formData, "existingImageUrls");
  const uploadedImageUrls = await saveUploadedFiles(getFiles(formData, "images"), "kamar");
  const imageUrls = [...existingImageUrls, ...uploadedImageUrls];

  if (
    !kosanId ||
    !name ||
    !Number.isFinite(monthlyPrice) ||
    monthlyPrice <= 0 ||
    !Number.isInteger(quantity) ||
    quantity < 0
  ) {
    return NextResponse.json(
      { message: "Kosan, nama kamar, harga bulanan, dan quantity wajib diisi dengan benar." },
      { status: 400 }
    );
  }

  const existing = await prisma.room.findFirst({
    where: {
      id,
      kosan: {
        ownerId: owner.id,
      },
    },
  });

  if (!existing) {
    return NextResponse.json({ message: "Data kamar tidak ditemukan." }, { status: 404 });
  }

  const kosan = await prisma.kosan.findFirst({
    where: {
      id: kosanId,
      ownerId: owner.id,
    },
  });

  if (!kosan) {
    return NextResponse.json({ message: "Kosan tidak ditemukan." }, { status: 404 });
  }

  const updated = await prisma.room.update({
    where: { id: existing.id },
    data: {
      kosanId: kosan.id,
      name,
      monthlyPrice: Math.round(monthlyPrice),
      quantity,
      imageUrls,
    },
    include: {
      bookings: {
        where: {
          status: "active",
        },
        select: {
          id: true,
        },
      },
      kosan: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ room: mapRoom(updated) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  const room = await prisma.room.findFirst({
    where: {
      id,
      kosan: {
        ownerId: owner.id,
      },
    },
    include: {
      _count: {
        select: {
          bookings: true,
        },
      },
    },
  });

  if (!room) {
    return NextResponse.json({ message: "Data kamar tidak ditemukan." }, { status: 404 });
  }

  if (room._count.bookings > 0) {
    return NextResponse.json(
      { message: "Kamar yang sudah punya booking belum bisa dihapus." },
      { status: 400 }
    );
  }

  await prisma.room.delete({
    where: { id: room.id },
  });

  return NextResponse.json({ success: true });
}
