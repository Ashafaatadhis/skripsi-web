"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverview } from "@/lib/types/dashboard";

type OverviewChartsProps = {
  charts: DashboardOverview["charts"];
};

const paymentStatusColorMap = {
  paid: "#10b981",
  pending: "#f59e0b",
  overdue: "#ef4444",
  cancelled: "#64748b",
} as const;

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function OverviewCharts({ charts }: OverviewChartsProps) {
  const pieData = charts.paymentStatus.filter((item) => item.value > 0);
  const totalPaymentItems = charts.paymentStatus.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Card className="bg-card/90">
          <CardHeader>
            <CardTitle>Tren tagihan 6 bulan</CardTitle>
            <CardDescription>
              Bandingkan total tagihan yang terbit dengan pembayaran yang sudah lunas per bulan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.revenueTrend} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dashboardTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="dashboardPaid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickFormatter={(value: number) => `Rp${Math.round(value / 1000)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 18,
                    }}
                    formatter={(value, name) => [
                      formatRupiah(Number(value ?? 0)),
                      name === "totalAmount" ? "Total tagihan" : "Sudah lunas",
                    ]}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: "12px",
                    }}
                    formatter={(value) => (value === "totalAmount" ? "Total tagihan" : "Sudah lunas")}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#dashboardTotal)"
                  />
                  <Area
                    type="monotone"
                    dataKey="paidAmount"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#dashboardPaid)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/90">
          <CardHeader>
            <CardTitle>Status pembayaran</CardTitle>
            <CardDescription>
              Distribusi semua tagihan berdasarkan status verifikasi saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[220px] w-full">
              {totalPaymentItems ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 18,
                      }}
                      formatter={(value) => [`${formatNumber(Number(value ?? 0))} tagihan`, "Jumlah"]}
                    />
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={56}
                      outerRadius={84}
                      paddingAngle={4}
                    >
                      {pieData.map((item) => (
                        <Cell key={item.status} fill={paymentStatusColorMap[item.status]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-dashed border-border/70 bg-background/50 text-sm text-muted-foreground">
                  Belum ada tagihan untuk divisualkan.
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {charts.paymentStatus.map((item) => (
                <div
                  key={item.status}
                  className="rounded-[1.25rem] border border-border/70 bg-background/60 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: paymentStatusColorMap[item.status] }}
                      />
                      <span className="truncate text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {formatNumber(item.value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-card/90">
          <CardHeader>
            <CardTitle>Hunian per kosan</CardTitle>
            <CardDescription>
              Lihat kapasitas terisi dan slot yang masih tersedia di tiap kosan aktif.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {charts.occupancyByKosan.length ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={charts.occupancyByKosan}
                    margin={{ top: 8, right: 12, left: 8, bottom: 0 }}
                    barCategoryGap={18}
                  >
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 18,
                      }}
                      formatter={(value, name) => [
                        `${formatNumber(Number(value ?? 0))} kamar`,
                        name === "occupied" ? "Terisi" : "Tersedia",
                      ]}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                      }}
                      formatter={(value) => (value === "occupied" ? "Terisi" : "Tersedia")}
                    />
                    <Bar dataKey="occupied" stackId="rooms" fill="#06b6d4" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="available" stackId="rooms" fill="#cbd5e1" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-background/50 p-6 text-sm text-muted-foreground">
                Belum ada kamar aktif untuk divisualkan.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
