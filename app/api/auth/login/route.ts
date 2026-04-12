import { NextResponse } from "next/server";

import { createSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
    remember?: boolean;
  } | null;

  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ message: "Email dan password wajib diisi." }, { status: 400 });
  }

  const owner = await prisma.owner.findUnique({
    where: { email },
  });

  if (!owner || !verifyPassword(password, owner.passwordHash)) {
    return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
  }

  await createSession(owner.id, Boolean(body?.remember));

  return NextResponse.json({
    owner: {
      id: owner.id,
      email: owner.email,
      name: owner.name,
    },
  });
}
