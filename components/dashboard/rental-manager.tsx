"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";

import { RentalStatus } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatAppDate } from "@/lib/datetime";

type RentalItem = {
  id: string;
  humanId: string;
  roomId: string;
  roomHumanId: string;
  roomName: string;
  kosanName: string;
  tenantId: string;
  tenantName: string;
  tenantPhone: string | null;
  startDate: string;
  paidUntil: string | null;
  checkoutDate: string | null;
  monthlyPriceSnapshot: number;
  status: RentalStatus;
  note: string | null;
  paymentsCount: number;
};

type RentalResponse = {
  rentals: RentalItem[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    q: string;
  };
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusLabel(status: RentalStatus) {
  switch (status) {
    case RentalStatus.active:
      return "Aktif";
    case RentalStatus.checked_out:
      return "Check-out";
    case RentalStatus.cancelled:
      return "Dibatalkan";
    default:
      return status;
  }
}

async function getRentals(page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (q.trim()) params.set("q", q.trim());

  const response = await fetch(`/api/sewa?${params.toString()}`, { credentials: "include" });
  const data = (await response.json()) as { message?: string } & RentalResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal mengambil data sewa.");
  }

  return data;
}

export function RentalManager() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);

  const { data, isLoading, error } = useQuery({
    queryKey: ["rentals", deferredSearch, page],
    queryFn: () => getRentals(page, deferredSearch),
  });

  const rentals = data?.rentals ?? [];
  const meta = data?.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 1, q: "" };

  React.useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  React.useEffect(() => {
    if (meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta.page, page]);

  return (
    <div className="min-h-screen bg-muted/35 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-start gap-3 rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-sm sm:items-center sm:p-6">
          <SidebarTrigger className="mt-0.5 sm:mt-0" />
          <div className="space-y-2">
            <Badge>Sewa</Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Daftar sewa aktif dan riwayat</h1>
              <p className="text-sm text-muted-foreground">
                Sewa baru dibuat tenant lewat bot. Dashboard ini fokus untuk pemantauan owner.
              </p>
            </div>
          </div>
        </header>

        <Card className="bg-card/90">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3">Data sewa</CardTitle>
              <CardDescription>{meta.total} sewa tercatat di akun owner ini.</CardDescription>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-10"
                placeholder="Cari ID sewa, tenant, kamar, atau kosan"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[1.5rem] border border-border/70">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sewa</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Kamar</TableHead>
                    <TableHead>Mulai</TableHead>
                    <TableHead>Lunas Sampai</TableHead>
                    <TableHead>Harga / bulan</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        Memuat data sewa...
                      </TableCell>
                    </TableRow>
                  ) : error instanceof Error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-red-600 dark:text-red-300">
                        {error.message}
                      </TableCell>
                    </TableRow>
                  ) : rentals.length ? (
                    rentals.map((rental) => (
                      <TableRow key={rental.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{rental.humanId}</p>
                            <p className="text-xs text-muted-foreground">{rental.paymentsCount} pembayaran</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{rental.tenantName}</p>
                            <p className="text-xs text-muted-foreground">{rental.tenantPhone ?? "-"}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{rental.roomName}</p>
                            <p className="text-xs text-muted-foreground">{rental.kosanName}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatAppDate(rental.startDate)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatAppDate(rental.paidUntil)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatRupiah(rental.monthlyPriceSnapshot)}</TableCell>
                        <TableCell>
                          <Badge variant={rental.status === RentalStatus.active ? "default" : "secondary"}>
                            {getStatusLabel(rental.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        {search.trim()
                          ? "Data sewa tidak ditemukan untuk pencarian ini."
                          : "Belum ada sewa. Tenant akan muncul di sini setelah mulai sewa lewat bot."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {rentals.length} dari {meta.total} sewa
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={meta.page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </Button>
                <span className="text-sm text-muted-foreground">
                  Halaman {meta.page} / {meta.totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={meta.page >= meta.totalPages}
                  onClick={() => setPage((current) => Math.min(meta.totalPages, current + 1))}
                >
                  Berikutnya
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
