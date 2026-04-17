import { PaymentStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function syncRentalPaidUntil(rentalId: string) {
  const latestPaid = await prisma.payment.findFirst({
    where: {
      rentalId,
      status: PaymentStatus.paid,
    },
    orderBy: [{ periodEnd: "desc" }],
    select: {
      periodEnd: true,
    },
  });

  return prisma.rental.update({
    where: { id: rentalId },
    data: {
      paidUntil: latestPaid?.periodEnd ?? null,
    },
    select: {
      id: true,
      paidUntil: true,
    },
  });
}
