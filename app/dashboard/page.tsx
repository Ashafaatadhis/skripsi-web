import Link from "next/link";
import {
  BedDouble,
  BookOpen,
  Building2,
  DoorOpen,
  CreditCard,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Kosan aktif",
    value: "4",
    note: "+1 bulan ini",
    icon: Building2,
  },
  {
    title: "Kamar terisi",
    value: "96",
    note: "87% occupancy",
    icon: BedDouble,
  },
  {
    title: "Tagihan pending",
    value: "12",
    note: "3 jatuh tempo hari ini",
    icon: CreditCard,
  },
];

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
    title: "Booking",
    description: "Kelola tenant yang sedang menempati kamar.",
    href: "/dashboard/booking",
    icon: BookOpen,
  },
];

const payments = [
  { tenant: "Raka - A12", status: "Lunas", amount: "Rp850.000", time: "08:16" },
  { tenant: "Nina - B05", status: "Menunggu verifikasi", amount: "Rp900.000", time: "09:05" },
  { tenant: "Bagas - C02", status: "Terlambat", amount: "Rp800.000", time: "Kemarin" },
];

export default function DashboardPage() {
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
                  Pantau kosan, kamar, pembayaran, dan aktivitas tenant dari satu layar.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1 sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Cari kamar, tenant, atau kosan" />
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
                  <Link href={action.href} className={cn(buttonVariants({ variant: "secondary" }), "w-full") }>
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
              <CardDescription>Status transfer dan verifikasi terakhir.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.tenant}
                  className="flex flex-col gap-3 rounded-[1.5rem] border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{payment.tenant}</p>
                    <p className="text-sm text-muted-foreground">{payment.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">{payment.amount}</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
