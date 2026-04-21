"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Pencil,
  Search,
  X,
} from "lucide-react";

import { PaymentStatus } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatAppDate } from "@/lib/datetime";

type PaymentItem = {
  id: string;
  humanId: string;
  rentalId: string;
  rentalHumanId: string;
  tenantName: string;
  roomName: string;
  kosanName: string;
  amount: number;
  monthsPaid: number;
  periodStart: string;
  periodEnd: string;
  paidAt: string | null;
  status: PaymentStatus;
  note: string | null;
  paidUntil: string | null;
  proofImageUrls: string[];
};

type PaymentsResponse = {
  payments: PaymentItem[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    q: string;
  };
};

type PaymentPayload = {
  status: PaymentStatus;
  note: string;
  existingProofImageUrls: string[];
  newProofImages: File[];
};

const paymentStatusOptions = [
  { value: PaymentStatus.pending, label: "Pending" },
  { value: PaymentStatus.paid, label: "Lunas" },
  { value: PaymentStatus.overdue, label: "Terlambat" },
  { value: PaymentStatus.cancelled, label: "Dibatalkan" },
];

const emptyForm: PaymentPayload = {
  status: PaymentStatus.pending,
  note: "",
  existingProofImageUrls: [],
  newProofImages: [],
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusLabel(status: PaymentStatus) {
  return paymentStatusOptions.find((item) => item.value === status)?.label ?? status;
}

function parseProofImageValue(value: string): string[] {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "[]") {
    return [];
  }

  if (
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.flatMap((item) => (typeof item === "string" ? parseProofImageValue(item) : []));
      }

      if (typeof parsed === "string") {
        return parseProofImageValue(parsed);
      }
    } catch {
      return [trimmed];
    }
  }

  return [trimmed];
}

function normalizeProofImageUrls(images: string[]) {
  return Array.from(
    new Set(
      images
        .flatMap(parseProofImageValue)
        .map((imageUrl) => {
          if (imageUrl.startsWith("/")) {
            return imageUrl;
          }

          if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
            try {
              return new URL(imageUrl).toString();
            } catch {
              return null;
            }
          }

          return null;
        })
        .filter((imageUrl): imageUrl is string => Boolean(imageUrl)),
    ),
  );
}

function getProofImageDisplayUrl(imageUrl: string) {
  const uploadPrefix = "/uploads/";

  if (imageUrl.startsWith(uploadPrefix)) {
    return `/api/uploads/${imageUrl.slice(uploadPrefix.length)}`;
  }

  return imageUrl;
}

function ImageStack({ images }: { images: string[] }) {
  const normalizedImages = normalizeProofImageUrls(images);

  if (!normalizedImages.length) {
    return <span className="text-muted-foreground">-</span>;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {normalizedImages.slice(0, 3).map((imageUrl, index) => (
          <div
            key={`${imageUrl}-${index}`}
            className="relative h-16 w-16 overflow-hidden rounded-md border border-border/70 bg-muted"
          >
            <Image
              src={getProofImageDisplayUrl(imageUrl)}
              alt="Bukti pembayaran"
              fill
              unoptimized
              className="object-cover"
              sizes="64px"
            />
          </div>
        ))}
      </div>
      {normalizedImages.length > 3 ? (
        <span className="text-xs text-muted-foreground">+{normalizedImages.length - 3}</span>
      ) : null}
    </div>
  );
}

async function getPayments(page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (q.trim()) params.set("q", q.trim());

  const response = await fetch(`/api/pembayaran?${params.toString()}`, { credentials: "include" });
  const data = (await response.json()) as { message?: string } & PaymentsResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal mengambil data pembayaran.");
  }

  return data;
}

async function updatePayment(id: string, payload: PaymentPayload) {
  const formData = new FormData();
  formData.set("status", payload.status);
  formData.set("note", payload.note);
  formData.set("existingProofImageUrls", JSON.stringify(payload.existingProofImageUrls));
  payload.newProofImages.forEach((file) => formData.append("proofImages", file));

  const response = await fetch(`/api/pembayaran/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = (await response.json()) as { message?: string; payment?: PaymentItem };

  if (!response.ok || !data.payment) {
    throw new Error(data.message ?? "Gagal memperbarui pembayaran.");
  }

  return data.payment;
}

export function PaymentManager() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPayment, setEditingPayment] = React.useState<PaymentItem | null>(null);
  const [form, setForm] = React.useState<PaymentPayload>(emptyForm);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);

  const { data, isLoading, error } = useQuery({
    queryKey: ["payments", deferredSearch, page],
    queryFn: () => getPayments(page, deferredSearch),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PaymentPayload }) => updatePayment(id, payload),
    onSuccess: async () => {
      setDialogOpen(false);
      setEditingPayment(null);
      setForm(emptyForm);
      setFormError(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["payments"] }),
        queryClient.invalidateQueries({ queryKey: ["rentals"] }),
      ]);
    },
    onError: (mutationError) => {
      setFormError(mutationError instanceof Error ? mutationError.message : "Gagal memperbarui pembayaran.");
    },
  });

  const payments = data?.payments ?? [];
  const meta = data?.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 1, q: "" };

  React.useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  React.useEffect(() => {
    if (meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta.page, page]);

  function openEditDialog(payment: PaymentItem) {
    setEditingPayment(payment);
    setForm({
      status: payment.status,
      note: payment.note ?? "",
      existingProofImageUrls: normalizeProofImageUrls(payment.proofImageUrls),
      newProofImages: [],
    });
    setFormError(null);
    setDialogOpen(true);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingPayment) return;

    setFormError(null);
    updateMutation.mutate({
      id: editingPayment.id,
      payload: {
        status: form.status,
        note: form.note.trim(),
        existingProofImageUrls: normalizeProofImageUrls(form.existingProofImageUrls),
        newProofImages: form.newProofImages,
      },
    });
  }

  return (
    <div className="min-h-screen bg-muted/35 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-start gap-3 rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-sm sm:items-center sm:p-6">
          <SidebarTrigger className="mt-0.5 sm:mt-0" />
          <div className="space-y-2">
            <Badge>Pembayaran</Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Verifikasi pembayaran tenant</h1>
              <p className="text-sm text-muted-foreground">
                Tagihan dibuat tenant lewat bot. Owner cukup cek periode, bukti transfer, lalu verifikasi statusnya.
              </p>
            </div>
          </div>
        </header>

        <Card className="bg-card/90">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3">Data pembayaran</CardTitle>
              <CardDescription>{meta.total} pembayaran tercatat di akun owner ini.</CardDescription>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-10"
                placeholder="Cari ID, tenant, kamar, atau kosan"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-[1.5rem] border border-border/70">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tagihan</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bukti</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        Memuat data pembayaran...
                      </TableCell>
                    </TableRow>
                  ) : error instanceof Error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-red-600 dark:text-red-300">
                        {error.message}
                      </TableCell>
                    </TableRow>
                  ) : payments.length ? (
                    payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{payment.humanId}</p>
                            <p className="text-xs text-muted-foreground">{payment.rentalHumanId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{payment.tenantName}</p>
                            <p className="text-xs text-muted-foreground">
                              {payment.roomName} • {payment.kosanName}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="space-y-1">
                            <p>
                              {formatAppDate(payment.periodStart)} - {formatAppDate(payment.periodEnd)}
                            </p>
                            <p className="text-xs">{payment.monthsPaid} bulan</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatRupiah(payment.amount)}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === PaymentStatus.paid ? "default" : "secondary"}>
                            {getStatusLabel(payment.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <ImageStack images={payment.proofImageUrls} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="secondary" size="sm" onClick={() => openEditDialog(payment)}>
                            <Pencil className="h-4 w-4" />
                            Verifikasi
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        {search.trim()
                          ? "Pembayaran tidak ditemukan untuk pencarian ini."
                          : "Belum ada pembayaran. Tenant akan membuat tagihan dari bot sebelum muncul di sini."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {payments.length} dari {meta.total} pembayaran
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

        <Dialog.Root
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingPayment(null);
              setForm(emptyForm);
              setFormError(null);
            }
          }}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                    Verifikasi pembayaran
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                    {editingPayment
                      ? `${editingPayment.humanId} • ${editingPayment.tenantName}`
                      : "Pilih pembayaran dulu."}
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-foreground transition hover:bg-accent"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Tutup dialog</span>
                  </button>
                </Dialog.Close>
              </div>

              {editingPayment ? (
                <form className="mt-6 space-y-4" onSubmit={submitForm}>
                  <div className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground">
                    <p>
                      Periode: <span className="font-medium text-foreground">{formatAppDate(editingPayment.periodStart)} - {formatAppDate(editingPayment.periodEnd)}</span>
                    </p>
                    <p>
                      Nominal: <span className="font-medium text-foreground">{formatRupiah(editingPayment.amount)}</span>
                    </p>
                    <p>
                      Lunas tenant sampai: <span className="font-medium text-foreground">{formatAppDate(editingPayment.paidUntil)}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="status">
                      Status
                    </label>
                    <select
                      id="status"
                      value={form.status}
                      disabled={updateMutation.isPending}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, status: event.target.value as PaymentStatus }))
                      }
                      className="flex h-12 w-full rounded-2xl border border-border/70 bg-background/90 px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                    >
                      {paymentStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="note">
                      Catatan
                    </label>
                    <textarea
                      id="note"
                      value={form.note}
                      disabled={updateMutation.isPending}
                      onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                      className="min-h-28 w-full rounded-2xl border border-border/70 bg-background/90 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                      placeholder="Contoh: nominal cocok, bukti transfer jelas."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="proofImages">
                      Tambah bukti baru
                    </label>
                    <Input
                      id="proofImages"
                      type="file"
                      multiple
                      accept="image/*"
                      disabled={updateMutation.isPending}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          newProofImages: Array.from(event.target.files ?? []),
                        }))
                      }
                    />
                  </div>

                  {form.existingProofImageUrls.length ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Bukti tersimpan</p>
                      <ImageStack images={form.existingProofImageUrls} />
                    </div>
                  ) : null}

                  {formError ? (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                      {formError}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap justify-end gap-3 pt-2">
                    <Dialog.Close asChild>
                      <Button type="button" variant="secondary" disabled={updateMutation.isPending}>
                        Batal
                      </Button>
                    </Dialog.Close>
                    <Button type="submit" disabled={updateMutation.isPending}>
                      Simpan verifikasi
                    </Button>
                  </div>
                </form>
              ) : null}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
