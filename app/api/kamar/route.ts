import { NextResponse } from "next/server";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFiles, getString, getStringArray, saveUploadedFiles } from "@/lib/server/uploads";
import { generateHumanId } from "@/lib/id";

const PAGE_SIZE = 10;

function mapRoom(room: {
  id: string;
  humanId: string;
  name: string;
  monthlyPrice: number;
  quantity: number;
  images: Array<{ url: string }>;
  facilities: string[];
  rentals: Array<{ id: string }>;
  kosan: { id: string; name: string };
}) {
  const bookedCount = room.rentals.length;
  const availableQuantity = Math.max(room.quantity - bookedCount, 0);

  return {
    id: room.id,
    humanId: room.humanId,
    name: room.name,
    monthlyPrice: room.monthlyPrice,
    quantity: room.quantity,
    imageUrls: (room.images || []).map((img) => img.url),
    facilities: room.facilities || [],
    bookedCount,
    availableQuantity,
    kosanId: room.kosan.id,
    kosanName: room.kosan.name,
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
    kosan: { ownerId: owner.id },
    ...(rawQuery
      ? {
          OR: [
            { humanId: { contains: rawQuery, mode: "insensitive" as const } },
            { name: { contains: rawQuery, mode: "insensitive" as const } },
            { kosan: { name: { contains: rawQuery, mode: "insensitive" as const } } },
          ],
        }
      : {}),
  };

  const total = await prisma.room.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(safePage, totalPages);

  const rooms = await prisma.room.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      images: true,
      rentals: {
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

  return NextResponse.json({
    rooms: rooms.map(mapRoom),
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
  const kosanId = getString(formData, "kosanId");
  const name = getString(formData, "name");
  const monthlyPrice = Number(getString(formData, "monthlyPrice"));
  const quantity = Number(getString(formData, "quantity"));
  const existingImageUrls = getStringArray(formData, "existingImageUrls");
  const facilities = getStringArray(formData, "facilities");
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

  const kosan = await prisma.kosan.findFirst({
    where: {
      id: kosanId,
      ownerId: owner.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!kosan) {
    return NextResponse.json({ message: "Kosan tidak ditemukan." }, { status: 404 });
  }

  const room = await prisma.room.create({
    data: {
      humanId: generateHumanId("RM"),
      kosanId: kosan.id,
      name,
      monthlyPrice: Math.round(monthlyPrice),
      quantity,
      images: {
        create: imageUrls.map((url) => ({ url })),
      },
      facilities,
    },
    include: {
      images: true,
      rentals: {
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

  return NextResponse.json({ room: mapRoom(room) }, { status: 201 });
}
