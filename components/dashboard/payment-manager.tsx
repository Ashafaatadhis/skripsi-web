"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LoaderCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { PaymentStatus } from "@/generated/prisma/enums";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PaymentItem = {
  id: string;
  bookingId: string;
  tenantName: string;
  roomName: string;
  kosanName: string;
  amount: number;
  dueDate: string;
  paidAt: string | null;
  status: PaymentStatus;
  note: string | null;
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

type BookingOption = {
  id: string;
  tenantName: string;
  roomName: string;
  kosanName: string;
  label: string;
};

type PaymentPayload = {
  bookingId: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  note: string;
  existingProofImageUrls: string[];
  newProofImages: File[];
};

const emptyForm: PaymentPayload = {
  bookingId: "",
  amount: 0,
  dueDate: "",
  status: PaymentStatus.pending,
  note: "",
  existingProofImageUrls: [],
  newProofImages: [],
};

const paymentStatusOptions = [
  { value: PaymentStatus.pending, label: "Pending" },
  { value: PaymentStatus.paid, label: "Lunas" },
  { value: PaymentStatus.overdue, label: "Terlambat" },
  { value: PaymentStatus.cancelled, label: "Dibatalkan" },
];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function getStatusLabel(status: PaymentStatus) {
  return paymentStatusOptions.find((item) => item.value === status)?.label ?? status;
}

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages] as const;
  }

  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages] as const;
}

function ImageStack({ images }: { images: string[] }) {
  if (!images.length) {
    return <span className="text-muted-foreground">-</span>;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {images.slice(0, 3).map((imageUrl, index) => (
          <div
            key={`${imageUrl}-${index}`}
            className="relative h-16 w-16 overflow-hidden rounded-md border border-border/70 bg-muted"
          >
            <Image src={imageUrl} alt="Bukti pembayaran" fill className="object-cover" sizes="64px" />
          </div>
        ))}
      </div>

      {images.length > 3 ? (
        <span className="text-xs text-muted-foreground">+{images.length - 3}</span>
      ) : null}
    </div>
  );
}

async function getPayments(page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });

  if (q.trim()) {
    params.set("q", q.trim());
  }

  const response = await fetch(`/api/pembayaran?${params.toString()}`, { credentials: "include" });
  const data = (await response.json()) as { message?: string } & PaymentsResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal mengambil data pembayaran.");
  }

  return data;
}

async function getBookingOptions() {
  const response = await fetch("/api/options/booking", { credentials: "include" });
  const data = (await response.json()) as { message?: string; bookings?: BookingOption[] };

  if (!response.ok || !data.bookings) {
    throw new Error(data.message ?? "Gagal mengambil daftar booking.");
  }

  return data.bookings;
}

async function createPayment(payload: PaymentPayload) {
  const formData = new FormData();
  formData.set("bookingId", payload.bookingId);
  formData.set("amount", String(payload.amount));
  formData.set("dueDate", payload.dueDate);
  formData.set("status", payload.status);
  formData.set("note", payload.note);
  formData.set("existingProofImageUrls", JSON.stringify(payload.existingProofImageUrls));
  payload.newProofImages.forEach((file) => formData.append("proofImages", file));

  const response = await fetch("/api/pembayaran", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = (await response.json()) as { message?: string; payment?: PaymentItem };

  if (!response.ok || !data.payment) {
    throw new Error(data.message ?? "Gagal menambah pembayaran.");
  }

  return data.payment;
}

async function updatePayment(id: string, payload: PaymentPayload) {
  const formData = new FormData();
  formData.set("bookingId", payload.bookingId);
  formData.set("amount", String(payload.amount));
  formData.set("dueDate", payload.dueDate);
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
    throw new Error(data.message ?? "Gagal mengubah pembayaran.");
  }

  return data.payment;
}

async function deletePayment(id: string) {
  const response = await fetch(`/api/pembayaran/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = (await response.json()) as { message?: string };

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal menghapus pembayaran.");
  }
}

export function PaymentManager() {
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<PaymentPayload>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<PaymentItem | null>(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);

  const { data, isLoading } = useQuery({
    queryKey: ["payments", deferredSearch, page],
    queryFn: () => getPayments(page, deferredSearch),
  });

  const {
    data: bookingOptions = [],
    isLoading: isBookingOptionsLoading,
    error: bookingOptionsError,
    refetch: refetchBookingOptions,
  } = useQuery({
    queryKey: ["booking-options"],
    queryFn: getBookingOptions,
  });

  const payments = data?.payments ?? [];
  const meta = data?.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 1, q: "" };
  const pageItems = getPageItems(meta.page, meta.totalPages);

  React.useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  React.useEffect(() => {
    if (!form.bookingId && bookingOptions.length) {
      setForm((current) => ({ ...current, bookingId: bookingOptions[0]?.id ?? "" }));
    }
  }, [form.bookingId, bookingOptions]);

  React.useEffect(() => {
    if (meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta.page, page]);

  const createMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal menambah pembayaran.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PaymentPayload }) => updatePayment(id, payload),
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal mengubah pembayaran.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function resetForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      bookingId: bookingOptions[0]?.id ?? "",
    });
    setFormError(null);
  }

  function openCreateDialog() {
    resetForm();
    void refetchBookingOptions();
    setDialogOpen(true);
  }

  function startEdit(item: PaymentItem) {
    setEditingId(item.id);
    setForm({
      bookingId: item.bookingId,
      amount: item.amount,
      dueDate: item.dueDate.slice(0, 10),
      status: item.status,
      note: item.note ?? "",
      existingProofImageUrls: item.proofImageUrls ?? [],
      newProofImages: [],
    });
    setFormError(null);
    setDialogOpen(true);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const payload = {
      bookingId: form.bookingId.trim(),
      amount: Number(form.amount),
      dueDate: form.dueDate,
      status: form.status,
      note: form.note.trim(),
      existingProofImageUrls: form.existingProofImageUrls,
      newProofImages: form.newProofImages,
    };

    if (!payload.bookingId || !Number.isFinite(payload.amount) || payload.amount <= 0 || !payload.dueDate) {
      setFormError("Booking, nominal, dan jatuh tempo wajib diisi dengan benar.");
      return;
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
      return;
    }

    createMutation.mutate(payload);
  }

  function confirmDelete() {
    if (!deleteTarget) {
      return;
    }

    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: async () => {
        setDeleteTarget(null);
        await queryClient.invalidateQueries({ queryKey: ["payments"] });
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
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Kelola pembayaran</h1>
              <p className="text-sm text-muted-foreground">List pembayaran tenant dari data booking.</p>
            </div>
          </div>
        </header>

        <Card className="bg-card/90">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3">Data pembayaran</CardTitle>
              <CardDescription>{meta.total} pembayaran tercatat di akun owner ini.</CardDescription>
            </div>

            <Dialog.Root
              open={dialogOpen}
              onOpenChange={(open) => {
                setDialogOpen(open);

                if (!open) {
                  resetForm();
                }
              }}
            >
              <Dialog.Trigger asChild>
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4" />
                  Tambah Pembayaran
                </Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                        {editingId ? "Edit pembayaran" : "Tambah pembayaran"}
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                        {editingId ? "Ubah data pembayaran yang dipilih." : "Masukkan pembayaran baru untuk booking yang aktif."}
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

                  {isBookingOptionsLoading ? (
                    <div className="mt-6 rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
                      Memuat daftar booking...
                    </div>
                  ) : bookingOptionsError ? (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-600 dark:text-red-300">
                        {bookingOptionsError instanceof Error
                          ? bookingOptionsError.message
                          : "Gagal mengambil daftar booking."}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button type="button" onClick={() => void refetchBookingOptions()}>
                          Coba Lagi
                        </Button>
                        <Dialog.Close asChild>
                          <Button type="button" variant="secondary">
                            Tutup
                          </Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  ) : bookingOptions.length ? (
                    <form className="mt-6 space-y-4" onSubmit={submitForm}>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="bookingId">
                          Booking
                        </label>
                        <select
                          id="bookingId"
                          value={form.bookingId}
                          disabled={isSubmitting}
                          onChange={(event) => setForm((current) => ({ ...current, bookingId: event.target.value }))}
                          className="flex h-12 w-full rounded-2xl border border-border/70 bg-background/90 px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                        >
                          {bookingOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="amount">
                          Nominal
                        </label>
                        <Input
                          id="amount"
                          type="number"
                          min={0}
                          value={form.amount || ""}
                          disabled={isSubmitting}
                          onChange={(event) => setForm((current) => ({ ...current, amount: Number(event.target.value) }))}
                          placeholder="850000"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground" htmlFor="dueDate">
                            Jatuh tempo
                          </label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={form.dueDate}
                            disabled={isSubmitting}
                            onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground" htmlFor="status">
                            Status
                          </label>
                          <select
                            id="status"
                            value={form.status}
                            disabled={isSubmitting}
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
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="note">
                          Catatan
                        </label>
                        <textarea
                          id="note"
                          value={form.note}
                          disabled={isSubmitting}
                          onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                          placeholder="Catatan pembayaran bulan April"
                          className="flex min-h-28 w-full rounded-3xl border border-border/70 bg-background/90 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="proofImageUrls">
                          Bukti bayar
                        </label>
                        <Input
                          id="proofImageUrls"
                          type="file"
                          multiple
                          accept="image/*"
                          disabled={isSubmitting}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              newProofImages: Array.from(event.target.files ?? []),
                            }))
                          }
                        />
                        <p className="text-xs text-muted-foreground">Upload banyak bukti bayar sekaligus jika perlu.</p>

                        {form.existingProofImageUrls.length ? (
                          <div className="flex flex-wrap gap-2">
                            {form.existingProofImageUrls.map((imageUrl, index) => (
                              <button
                                key={imageUrl}
                                type="button"
                                className="rounded-md border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground hover:bg-accent"
                                onClick={() =>
                                  setForm((current) => ({
                                    ...current,
                                    existingProofImageUrls: current.existingProofImageUrls.filter(
                                      (_, itemIndex) => itemIndex !== index
                                    ),
                                  }))
                                }
                              >
                                Hapus bukti {index + 1}
                              </button>
                            ))}
                          </div>
                        ) : null}

                        {form.newProofImages.length ? (
                          <div className="space-y-1 text-xs text-muted-foreground">
                            {form.newProofImages.map((file) => (
                              <div key={`${file.name}-${file.size}`}>{file.name}</div>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {formError ? (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                          {formError}
                        </div>
                      ) : null}

                      <div className="flex flex-wrap gap-3">
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                              Memproses...
                            </>
                          ) : editingId ? (
                            "Simpan Perubahan"
                          ) : (
                            "Tambah Pembayaran"
                          )}
                        </Button>
                        <Dialog.Close asChild>
                          <Button type="button" variant="secondary" disabled={isSubmitting}>
                            Batal
                          </Button>
                        </Dialog.Close>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
                        Belum ada booking. Buat booking dulu supaya pembayaran bisa ditambahkan.
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <Link href="/dashboard/kamar">Ke Halaman Kamar</Link>
                        </Button>
                        <Dialog.Close asChild>
                          <Button type="button" variant="secondary">
                            Tutup
                          </Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  )}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </CardHeader>

          <CardContent>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari tenant, kamar, atau kosan..."
                  className="pl-10"
                />
              </div>

              <p className="text-sm text-muted-foreground">
                Halaman {meta.page} dari {meta.totalPages}
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/70">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-16">No</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Kamar</TableHead>
                    <TableHead>Kosan</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Bukti</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[170px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
                        Memuat data pembayaran...
                      </TableCell>
                    </TableRow>
                  ) : payments.length ? (
                    payments.map((payment, index) => (
                      <TableRow key={payment.id}>
                        <TableCell className="text-muted-foreground">
                          {(meta.page - 1) * meta.pageSize + index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{payment.tenantName}</TableCell>
                        <TableCell className="text-muted-foreground">{payment.roomName}</TableCell>
                        <TableCell className="text-muted-foreground">{payment.kosanName}</TableCell>
                        <TableCell className="text-muted-foreground">{formatRupiah(payment.amount)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(payment.dueDate)}</TableCell>
                        <TableCell>
                          <ImageStack images={payment.proofImageUrls ?? []} />
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                            {getStatusLabel(payment.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm" onClick={() => startEdit(payment)}>
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={deleteMutation.isPending}
                              onClick={() => setDeleteTarget(payment)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
                        {meta.q
                          ? "Data pembayaran tidak ditemukan untuk pencarian ini."
                          : bookingOptions.length
                            ? "Belum ada pembayaran. Tambah data pertama dari tombol di kanan atas."
                            : "Buat booking dulu sebelum menambahkan pembayaran."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Menampilkan {payments.length} dari {meta.total} pembayaran
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-9 w-9 rounded-md px-0"
                  disabled={meta.page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Halaman sebelumnya</span>
                </Button>

                <div className="flex items-center gap-2">
                  {pageItems.map((item, index) =>
                    item === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-1 text-sm text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={item}
                        variant={item === meta.page ? "default" : "secondary"}
                        size="sm"
                        className="h-9 w-9 rounded-md px-0"
                        onClick={() => setPage(item)}
                      >
                        {item}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="h-9 w-9 rounded-md px-0"
                  disabled={meta.page >= meta.totalPages}
                  onClick={() => setPage((current) => Math.min(meta.totalPages, current + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Halaman berikutnya</span>
                </Button>
              </div>
            </div>

            {deleteMutation.error ? (
              <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                {deleteMutation.error instanceof Error ? deleteMutation.error.message : "Gagal menghapus pembayaran."}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Dialog.Root open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
              <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                Hapus pembayaran?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                {deleteTarget
                  ? `Pembayaran untuk ${deleteTarget.tenantName} akan dihapus permanen. Aksi ini tidak bisa dibatalkan.`
                  : "Konfirmasi penghapusan pembayaran."}
              </Dialog.Description>

              {deleteMutation.error ? (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                  {deleteMutation.error instanceof Error
                    ? deleteMutation.error.message
                    : "Gagal menghapus pembayaran."}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => setDeleteTarget(null)} disabled={deleteMutation.isPending}>
                  Batal
                </Button>
                <Button onClick={confirmDelete} disabled={deleteMutation.isPending}>
                  {deleteMutation.isPending ? "Menghapus..." : "Ya, hapus"}
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
