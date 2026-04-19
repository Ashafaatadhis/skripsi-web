export type DashboardPaymentStatus = "paid" | "pending" | "overdue" | "cancelled";

export type DashboardOverview = {
  stats: {
    kosanCount: number;
    kosanAddedThisMonth: number;
    occupiedRoomSlots: number;
    totalRoomSlots: number;
    occupancyRate: number;
    pendingPayments: number;
    overduePayments: number;
  };
  charts: {
    revenueTrend: Array<{
      month: string;
      totalAmount: number;
      paidAmount: number;
    }>;
    paymentStatus: Array<{
      status: DashboardPaymentStatus;
      label: string;
      value: number;
    }>;
    occupancyByKosan: Array<{
      name: string;
      occupied: number;
      available: number;
      total: number;
    }>;
  };
  recentPayments: Array<{
    id: string;
    humanId: string;
    tenantName: string;
    roomName: string;
    amount: number;
    status: DashboardPaymentStatus;
    occurredAt: Date;
  }>;
};
