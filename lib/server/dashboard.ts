import "server-only";

import { PaymentStatus, RentalStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { DashboardOverview } from "@/lib/types/dashboard";

function getMonthStart(date: Date, monthOffset = 0) {
  return new Date(date.getFullYear(), date.getMonth() + monthOffset, 1);
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    year: "2-digit",
  }).format(date);
}

export async function getDashboardOverview(ownerId: string): Promise<DashboardOverview> {
  const now = new Date();
  const monthStart = getMonthStart(now);
  const trendStart = getMonthStart(now, -5);
  const trendMonths = Array.from({ length: 6 }, (_, index) => {
    const start = getMonthStart(trendStart, index);

    return {
      key: getMonthKey(start),
      label: getMonthLabel(start),
      start,
    };
  });

  const rentalOwnerWhere = {
    room: {
      kosan: {
        ownerId,
      },
    },
  };

  const paymentOwnerWhere = {
    rental: rentalOwnerWhere,
  };

  const [
    kosanCount,
    kosanAddedThisMonth,
    roomQuantitySummary,
    occupiedRoomSlots,
    paidPayments,
    pendingPayments,
    overduePayments,
    cancelledPayments,
    trendPayments,
    kosanOccupancy,
    recentPayments,
  ] = await Promise.all([
    prisma.kosan.count({
      where: { ownerId },
    }),
    prisma.kosan.count({
      where: {
        ownerId,
        createdAt: {
          gte: monthStart,
        },
      },
    }),
    prisma.room.aggregate({
      where: {
        kosan: {
          ownerId,
        },
      },
      _sum: {
        quantity: true,
      },
    }),
    prisma.rental.count({
      where: {
        ...rentalOwnerWhere,
        status: RentalStatus.active,
      },
    }),
    prisma.payment.count({
      where: {
        ...paymentOwnerWhere,
        status: PaymentStatus.paid,
      },
    }),
    prisma.payment.count({
      where: {
        ...paymentOwnerWhere,
        status: PaymentStatus.pending,
      },
    }),
    prisma.payment.count({
      where: {
        ...paymentOwnerWhere,
        status: PaymentStatus.overdue,
      },
    }),
    prisma.payment.count({
      where: {
        ...paymentOwnerWhere,
        status: PaymentStatus.cancelled,
      },
    }),
    prisma.payment.findMany({
      where: {
        ...paymentOwnerWhere,
        periodStart: {
          gte: trendStart,
        },
      },
      select: {
        amount: true,
        status: true,
        periodStart: true,
      },
    }),
    prisma.kosan.findMany({
      where: {
        ownerId,
      },
      select: {
        name: true,
        rooms: {
          select: {
            quantity: true,
            rentals: {
              where: {
                status: RentalStatus.active,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
    }),
    prisma.payment.findMany({
      where: paymentOwnerWhere,
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      take: 5,
      select: {
        id: true,
        humanId: true,
        amount: true,
        status: true,
        paidAt: true,
        updatedAt: true,
        rental: {
          select: {
            tenant: {
              select: {
                name: true,
              },
            },
            room: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
  ]);

  const totalRoomSlots = roomQuantitySummary._sum.quantity ?? 0;
  const safeOccupiedRoomSlots = totalRoomSlots
    ? Math.min(occupiedRoomSlots, totalRoomSlots)
    : occupiedRoomSlots;

  const revenueMap = new Map(
    trendMonths.map((item) => [
      item.key,
      {
        month: item.label,
        totalAmount: 0,
        paidAmount: 0,
      },
    ]),
  );

  for (const payment of trendPayments) {
    const bucket = revenueMap.get(getMonthKey(payment.periodStart));

    if (!bucket) {
      continue;
    }

    bucket.totalAmount += payment.amount;

    if (payment.status === PaymentStatus.paid) {
      bucket.paidAmount += payment.amount;
    }
  }

  const occupancyByKosan = kosanOccupancy
    .map((kosan) => {
      const total = kosan.rooms.reduce((sum, room) => sum + room.quantity, 0);
      const occupied = kosan.rooms.reduce(
        (sum, room) => sum + Math.min(room.rentals.length, room.quantity),
        0,
      );

      return {
        name: kosan.name,
        occupied,
        available: Math.max(total - occupied, 0),
        total,
      };
    })
    .filter((item) => item.total > 0)
    .sort((left, right) => right.total - left.total || right.occupied - left.occupied)
    .slice(0, 6);

  return {
    stats: {
      kosanCount,
      kosanAddedThisMonth,
      occupiedRoomSlots: safeOccupiedRoomSlots,
      totalRoomSlots,
      occupancyRate: totalRoomSlots ? Math.round((safeOccupiedRoomSlots / totalRoomSlots) * 100) : 0,
      pendingPayments,
      overduePayments,
    },
    charts: {
      revenueTrend: trendMonths.map((item) => revenueMap.get(item.key) ?? {
        month: item.label,
        totalAmount: 0,
        paidAmount: 0,
      }),
      paymentStatus: [
        { status: "paid", label: "Lunas", value: paidPayments },
        { status: "pending", label: "Pending", value: pendingPayments },
        { status: "overdue", label: "Terlambat", value: overduePayments },
        { status: "cancelled", label: "Dibatalkan", value: cancelledPayments },
      ],
      occupancyByKosan,
    },
    recentPayments: recentPayments.map((payment) => ({
      id: payment.id,
      humanId: payment.humanId,
      tenantName: payment.rental.tenant.name,
      roomName: payment.rental.room.name,
      amount: payment.amount,
      status: payment.status,
      occurredAt: payment.paidAt ?? payment.updatedAt,
    })),
  };
}
