import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json(
    { message: "Perubahan data sewa dilakukan lewat alur bot dan verifikasi pembayaran." },
    { status: 405 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Penghapusan sewa dari dashboard dinonaktifkan." },
    { status: 405 },
  );
}
