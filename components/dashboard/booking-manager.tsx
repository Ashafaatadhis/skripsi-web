"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { BookingStatus } from "@/generated/prisma/enums";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BookingItem = {
  id: string;
  roomId: string;
  roomName: string;
  kosanName: string;
  tenantId: string;
  tenantName: string;
  tenantPhone: string | null;
  startDate: string;
  endDate: string | null;
  status: BookingStatus;
  note: string | null;
  paymentsCount: number;
};

type BookingResponse = {
  bookings: BookingItem[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    q: string;
  };
};

type RoomOption = {
  id: string;
  name: string;
  kosanId: string;
  kosanName: string;
  quantity: number;
  bookedCount: number;
  availableQuantity: number;
  label: string;
};

type BookingPayload = {
  roomId: string;
  tenantName: string;
  tenantPhone: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  note: string;
};

const emptyForm: BookingPayload = {
  roomId: "",
  tenantName: "",
  tenantPhone: "",
  startDate: "",
  endDate: "",
  status: BookingStatus.active,
  note: "",
};

const bookingStatusOptions = [
  { value: BookingStatus.active, label: "Aktif" },
  { value: BookingStatus.completed, label: "Selesai" },
  { value: BookingStatus.cancelled, label: "Dibatalkan" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(value));
}

function getStatusLabel(status: BookingStatus) {
  return bookingStatusOptions.find((item) => item.value === status)?.label ?? status;
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

async function getBookings(page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });

  if (q.trim()) {
    params.set("q", q.trim());
  }

  const response = await fetch(`/api/booking?${params.toString()}`, { credentials: "include" });
  const data = (await response.json()) as { message?: string } & BookingResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal mengambil data booking.");
  }

  return data;
}

async function getRoomOptions() {
  const response = await fetch("/api/options/room", { credentials: "include" });
  const data = (await response.json()) as { message?: string; rooms?: RoomOption[] };

  if (!response.ok || !data.rooms) {
    throw new Error(data.message ?? "Gagal mengambil daftar kamar.");
  }

  return data.rooms;
}

async function createBooking(payload: BookingPayload) {
  const response = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { message?: string; booking?: BookingItem };

  if (!response.ok || !data.booking) {
    throw new Error(data.message ?? "Gagal menambah booking.");
  }

  return data.booking;
}

async function updateBooking(id: string, payload: BookingPayload) {
  const response = await fetch(`/api/booking/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { message?: string; booking?: BookingItem };

  if (!response.ok || !data.booking) {
    throw new Error(data.message ?? "Gagal mengubah booking.");
  }

  return data.booking;
}

async function deleteBooking(id: string) {
  const response = await fetch(`/api/booking/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = (await response.json()) as { message?: string };

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal menghapus booking.");
  }
}

export function BookingManager() {
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<BookingPayload>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<BookingItem | null>(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", deferredSearch, page],
    queryFn: () => getBookings(page, deferredSearch),
  });

  const {
    data: roomOptions = [],
    isLoading: isRoomOptionsLoading,
    error: roomOptionsError,
    refetch: refetchRoomOptions,
  } = useQuery({
    queryKey: ["room-options"],
    queryFn: getRoomOptions,
  });

  const bookings = data?.bookings ?? [];
  const meta = data?.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 1, q: "" };
  const pageItems = getPageItems(meta.page, meta.totalPages);

  React.useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  React.useEffect(() => {
    if (!form.roomId && roomOptions.length) {
      setForm((current) => ({ ...current, roomId: roomOptions[0]?.id ?? "" }));
    }
  }, [form.roomId, roomOptions]);

  React.useEffect(() => {
    if (meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta.page, page]);

  async function invalidateRelatedQueries() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["bookings"] }),
      queryClient.invalidateQueries({ queryKey: ["booking-options"] }),
      queryClient.invalidateQueries({ queryKey: ["room-options"] }),
      queryClient.invalidateQueries({ queryKey: ["kamar"] }),
      queryClient.invalidateQueries({ queryKey: ["payments"] }),
    ]);
  }

  const createMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await invalidateRelatedQueries();
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal menambah booking.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BookingPayload }) => updateBooking(id, payload),
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await invalidateRelatedQueries();
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal mengubah booking.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: async () => {
      await invalidateRelatedQueries();
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function resetForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      roomId: roomOptions[0]?.id ?? "",
    });
    setFormError(null);
  }

  function openCreateDialog() {
    resetForm();
    void refetchRoomOptions();
    setDialogOpen(true);
  }

  function startEdit(item: BookingItem) {
    setEditingId(item.id);
    setForm({
      roomId: item.roomId,
      tenantName: item.tenantName,
      tenantPhone: item.tenantPhone ?? "",
      startDate: item.startDate.slice(0, 10),
      endDate: item.endDate?.slice(0, 10) ?? "",
      status: item.status,
      note: item.note ?? "",
    });
    setFormError(null);
    setDialogOpen(true);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const payload = {
      roomId: form.roomId.trim(),
      tenantName: form.tenantName.trim(),
      tenantPhone: form.tenantPhone.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.status,
      note: form.note.trim(),
    };

    if (!payload.roomId || !payload.tenantName || !payload.startDate) {
      setFormError("Kamar, nama tenant, dan tanggal mulai wajib diisi.");
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
        await invalidateRelatedQueries();
      },
    });
  }

  return (
    <div className="min-h-screen bg-muted/35 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-start gap-3 rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-sm sm:items-center sm:p-6">
          <SidebarTrigger className="mt-0.5 sm:mt-0" />
          <div className="space-y-2">
            <Badge>Booking</Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Kelola booking</h1>
              <p className="text-sm text-muted-foreground">List tenant yang menempati kamar.</p>
            </div>
          </div>
        </header>

        <Card className="bg-card/90">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3">Data booking</CardTitle>
              <CardDescription>{meta.total} booking tercatat di akun owner ini.</CardDescription>
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
                  Tambah Booking
                </Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                        {editingId ? "Edit booking" : "Tambah booking"}
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                        {editingId ? "Ubah data booking yang dipilih." : "Masukkan tenant baru untuk kamar yang tersedia."}
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

                  {isRoomOptionsLoading ? (
                    <div className="mt-6 rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
                      Memuat daftar kamar...
                    </div>
                  ) : roomOptionsError ? (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-600 dark:text-red-300">
                        {roomOptionsError instanceof Error ? roomOptionsError.message : "Gagal mengambil daftar kamar."}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button type="button" onClick={() => void refetchRoomOptions()}>
                          Coba Lagi
                        </Button>
                        <Dialog.Close asChild>
                          <Button type="button" variant="secondary">
                            Tutup
                          </Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  ) : roomOptions.length ? (
                    <form className="mt-6 space-y-4" onSubmit={submitForm}>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="roomId">
                          Kamar
                        </label>
                        <select
                          id="roomId"
                          value={form.roomId}
                          disabled={isSubmitting}
                          onChange={(event) => setForm((current) => ({ ...current, roomId: event.target.value }))}
                          className="flex h-12 w-full rounded-2xl border border-border/70 bg-background/90 px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                        >
                          {roomOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground" htmlFor="tenantName">
                            Nama tenant
                          </label>
                          <Input
                            id="tenantName"
                            value={form.tenantName}
                            disabled={isSubmitting}
                            onChange={(event) => setForm((current) => ({ ...current, tenantName: event.target.value }))}
                            placeholder="Raka"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground" htmlFor="tenantPhone">
                            No. HP
                          </label>
                          <Input
                            id="tenantPhone"
                            value={form.tenantPhone}
                            disabled={isSubmitting}
                            onChange={(event) => setForm((current) => ({ ...current, tenantPhone: event.target.value }))}
                            placeholder="08123456789"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground" htmlFor="startDate">
                            Tanggal mulai
                          </label>
                          <Input
                            id="startDate"
                            type="date"
                            value={form.startDate}
                            disabled={isSubmitting}
                            onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground" htmlFor="endDate">
                            Tanggal selesai
                          </label>
                          <Input
                            id="endDate"
                            type="date"
                            value={form.endDate}
                            disabled={isSubmitting}
                            onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))}
                          />
                        </div>
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
                            setForm((current) => ({ ...current, status: event.target.value as BookingStatus }))
                          }
                          className="flex h-12 w-full rounded-2xl border border-border/70 bg-background/90 px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                        >
                          {bookingStatusOptions.map((option) => (
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
                          disabled={isSubmitting}
                          onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                          placeholder="Tenant masuk per 1 Mei"
                          className="flex min-h-28 w-full rounded-3xl border border-border/70 bg-background/90 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                        />
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
                            "Tambah Booking"
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
                        Belum ada kamar. Buat kamar dulu supaya booking bisa ditambahkan.
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
                    <TableHead>Mulai</TableHead>
                    <TableHead>Selesai</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[170px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                        Memuat data booking...
                      </TableCell>
                    </TableRow>
                  ) : bookings.length ? (
                    bookings.map((booking, index) => (
                      <TableRow key={booking.id}>
                        <TableCell className="text-muted-foreground">
                          {(meta.page - 1) * meta.pageSize + index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          <div className="space-y-1">
                            <p>{booking.tenantName}</p>
                            {booking.tenantPhone ? (
                              <p className="text-xs text-muted-foreground">{booking.tenantPhone}</p>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{booking.roomName}</TableCell>
                        <TableCell className="text-muted-foreground">{booking.kosanName}</TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(booking.startDate)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {booking.endDate ? formatDate(booking.endDate) : "-"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                            {getStatusLabel(booking.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm" onClick={() => startEdit(booking)}>
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={deleteMutation.isPending}
                              onClick={() => setDeleteTarget(booking)}
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
                      <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                        {meta.q
                          ? "Data booking tidak ditemukan untuk pencarian ini."
                          : roomOptions.length
                            ? "Belum ada booking. Tambah data pertama dari tombol di kanan atas."
                            : "Buat kamar dulu sebelum menambahkan booking."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Menampilkan {bookings.length} dari {meta.total} booking
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
                {deleteMutation.error instanceof Error ? deleteMutation.error.message : "Gagal menghapus booking."}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Dialog.Root open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
              <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                Hapus booking?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                {deleteTarget
                  ? `Booking untuk ${deleteTarget.tenantName} akan dihapus permanen. Aksi ini tidak bisa dibatalkan.`
                  : "Konfirmasi penghapusan booking."}
              </Dialog.Description>

              {deleteMutation.error ? (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                  {deleteMutation.error instanceof Error ? deleteMutation.error.message : "Gagal menghapus booking."}
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
