import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BedDouble,
  BookOpen,
  Building2,
  CreditCard,
  DoorOpen,
  Search,
} from "lucide-react";

import { OverviewCharts } from "@/components/dashboard/overview-charts";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentOwner } from "@/lib/auth";
import { getDashboardOverview } from "@/lib/server/dashboard";
import type { DashboardPaymentStatus } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Kosan",
    description: "Lihat daftar kosan dan kelola datanya.",
    href: "/dashboard/kosan",
    icon: Building2,
  },
  {
    title: "Kamar",
    description: "Lihat daftar kamar dan status sewanya.",
    href: "/dashboard/kamar",
    icon: DoorOpen,
  },
  {
    title: "Pembayaran",
    description: "Cek status pembayaran tenant terbaru.",
    href: "/dashboard/pembayaran",
    icon: CreditCard,
  },
  {
    title: "Sewa",
    description: "Pantau tenant yang sedang menempati kamar.",
    href: "/dashboard/sewa",
    icon: BookOpen,
  },
] as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function getPaymentStatusLabel(status: DashboardPaymentStatus) {
  switch (status) {
    case "paid":
      return "Lunas";
    case "pending":
      return "Menunggu verifikasi";
    case "overdue":
      return "Terlambat";
    case "cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
}

function getPaymentStatusClassName(status: DashboardPaymentStatus) {
  switch (status) {
    case "paid":
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300";
    case "pending":
      return "bg-amber-500/15 text-amber-700 dark:text-amber-300";
    case "overdue":
      return "bg-red-500/15 text-red-700 dark:text-red-300";
    case "cancelled":
      return "bg-slate-500/15 text-slate-700 dark:text-slate-300";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

export default async function DashboardPage() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/login");
  }

  const overview = await getDashboardOverview(owner.id);

  const stats = [
    {
      title: "Kosan aktif",
      value: formatNumber(overview.stats.kosanCount),
      note:
        overview.stats.kosanCount > 0
          ? overview.stats.kosanAddedThisMonth > 0
            ? `+${formatNumber(overview.stats.kosanAddedThisMonth)} bulan ini`
            : "Belum ada tambahan kosan bulan ini"
          : "Belum ada kosan terdaftar",
      icon: Building2,
    },
    {
      title: "Kamar terisi",
      value: formatNumber(overview.stats.occupiedRoomSlots),
      note: overview.stats.totalRoomSlots
        ? `${formatNumber(overview.stats.occupancyRate)}% dari ${formatNumber(overview.stats.totalRoomSlots)} slot terisi`
        : "Belum ada slot kamar",
      icon: BedDouble,
    },
    {
      title: "Tagihan pending",
      value: formatNumber(overview.stats.pendingPayments),
      note:
        overview.stats.pendingPayments > 0
          ? overview.stats.overduePayments > 0
            ? `${formatNumber(overview.stats.overduePayments)} tagihan terlambat`
            : "Menunggu verifikasi owner"
          : overview.stats.overduePayments > 0
            ? `${formatNumber(overview.stats.overduePayments)} tagihan terlambat`
            : "Tidak ada tagihan yang menunggu",
      icon: CreditCard,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-muted/35 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3 sm:items-center">
            <SidebarTrigger className="mt-0.5 sm:mt-0" />
            <div className="space-y-2">
              <Badge>Dashboard overview</Badge>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Ringkasan operasional kosan
                </h1>
                <p className="text-sm text-muted-foreground">
                  Pantau kosan, kamar, pembayaran, dan aktivitas tenant milik {owner.name} dari satu
                  layar.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1 sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Cari detail data di menu kosan, kamar, atau sewa" />
            </div>
            <Link href="/login" className={cn(buttonVariants({ variant: "secondary" }))}>
              Ganti akun
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title} className="bg-card/90">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                  <div>
                    <CardDescription>{stat.title}</CardDescription>
                    <CardTitle className="mt-2 text-3xl">{stat.value}</CardTitle>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.note}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <OverviewCharts charts={overview.charts} />

        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Card key={action.title} className="bg-card/90">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-3">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={action.href}
                    className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                  >
                    Buka
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Pembayaran terbaru</CardTitle>
              <CardDescription>
                {overview.stats.kosanCount
                  ? "Status transfer dan verifikasi paling baru dari semua kosan milik owner."
                  : "Data pembayaran akan muncul setelah kosan dan sewa aktif mulai digunakan."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {overview.recentPayments.length ? (
                overview.recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col gap-3 rounded-[1.5rem] border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {payment.tenantName} - {payment.roomName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {payment.humanId} - {formatDateTime(payment.occurredAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {formatRupiah(payment.amount)}
                      </span>
                      <Badge
                        variant="secondary"
                        className={cn("border-transparent", getPaymentStatusClassName(payment.status))}
                      >
                        {getPaymentStatusLabel(payment.status)}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-background/50 p-6 text-sm text-muted-foreground">
                  Belum ada pembayaran untuk akun owner ini.
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
