import { NextResponse } from "next/server";

import { getCurrentOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFiles, getString, getStringArray, saveUploadedFiles } from "@/lib/server/uploads";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
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

  const kosan = await prisma.kosan.findFirst({
    where: {
      id,
      ownerId: owner.id,
    },
    include: {
      _count: {
        select: { rooms: true },
      },
    },
  });

  if (!kosan) {
    return NextResponse.json({ message: "Data kosan tidak ditemukan." }, { status: 404 });
  }

  const updated = await prisma.kosan.update({
    where: { id: kosan.id },
    data: {
      name,
      address,
      description: description || null,
      images: {
        deleteMany: {},
        create: imageUrls.map((url) => ({ url })),
      },
    },
    include: {
      images: true,
    },
  });

  return NextResponse.json({
    kosan: {
      id: updated.id,
      humanId: updated.humanId,
      name: updated.name,
      address: updated.address,
      description: updated.description,
      imageUrls: updated.images.map((img) => img.url),
      roomsCount: kosan._count.rooms,
    },
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  const kosan = await prisma.kosan.findFirst({
    where: {
      id,
      ownerId: owner.id,
    },
    include: {
      _count: {
        select: { rooms: true },
      },
    },
  });

  if (!kosan) {
    return NextResponse.json({ message: "Data kosan tidak ditemukan." }, { status: 404 });
  }

  if (kosan._count.rooms > 0) {
    return NextResponse.json(
      { message: "Kosan yang masih punya kamar belum bisa dihapus." },
      { status: 400 }
    );
  }

  await prisma.kosan.delete({
    where: { id: kosan.id },
  });

  return NextResponse.json({ success: true });
}
