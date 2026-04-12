import { NextResponse } from "next/server";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFiles, getString, getStringArray, saveUploadedFiles } from "@/lib/server/uploads";
import { generateHumanId } from "@/lib/id";

const PAGE_SIZE = 10;

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
    ownerId: owner.id,
    ...(rawQuery
      ? {
          OR: [
            { humanId: { contains: rawQuery, mode: "insensitive" as const } },
            { name: { contains: rawQuery, mode: "insensitive" as const } },
            { address: { contains: rawQuery, mode: "insensitive" as const } },
            { description: { contains: rawQuery, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const total = await prisma.kosan.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(safePage, totalPages);

  const kosan = await prisma.kosan.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      _count: {
        select: { rooms: true },
      },
    },
  });

  return NextResponse.json({
    kosan: kosan.map((item) => ({
      id: item.id,
      humanId: item.humanId,
      name: item.name,
      address: item.address,
      description: item.description,
      imageUrls: item.imageUrls,
      roomsCount: item._count.rooms,
    })),
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
  const name = getString(formData, "name");
  const address = getString(formData, "address");
  const description = getString(formData, "description");
  const existingImageUrls = getStringArray(formData, "existingImageUrls");
  const uploadedImageUrls = await saveUploadedFiles(getFiles(formData, "images"), "kosan");
  const imageUrls = [...existingImageUrls, ...uploadedImageUrls];

  if (!name || !address) {
    return NextResponse.json({ message: "Nama kosan dan alamat wajib diisi." }, { status: 400 });
  }

  const kosan = await prisma.kosan.create({
    data: {
      humanId: generateHumanId("KSN"),
      ownerId: owner.id,
      name,
      address,
      description: description || null,
      imageUrls,
    },
  });

  return NextResponse.json(
    {
      kosan: {
        id: kosan.id,
        humanId: kosan.humanId,
        name: kosan.name,
        address: kosan.address,
        description: kosan.description,
        imageUrls: kosan.imageUrls,
        roomsCount: 0,
      },
    },
    { status: 201 }
  );
}
