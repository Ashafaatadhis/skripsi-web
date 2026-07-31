"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, LoaderCircle, Pencil, Search, Trash2, Users, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatAppDate } from "@/lib/datetime";

type TenantActiveRental = {
  id: string;
  humanId: string;
  roomName: string;
  kosanName: string;
  startDate: string;
  monthlyPrice: number;
  paymentsCount: number;
};

type TenantItem = {
  id: string;
  telegramId: string | null;
  name: string;
  phone: string | null;
  createdAt: string;
  activeRental: TenantActiveRental | null;
  totalRentals: number;
};

type TenantResponse = {
  tenants: TenantItem[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    q: string;
  };
};

type TenantPayload = {
  name: string;
  phone: string;
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

async function getTenants(page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (q.trim()) params.set("q", q.trim());

  const response = await fetch(`/api/tenants?${params.toString()}`, { credentials: "include" });
  const data = (await response.json()) as { message?: string } & TenantResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal mengambil data penyewa.");
  }

  return data;
}

async function updateTenant(id: string, payload: TenantPayload) {
  const response = await fetch(`/api/tenants/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { message?: string; tenant?: { id: string; name: string; phone: string | null } };

  if (!response.ok || !data.tenant) {
    throw new Error(data.message ?? "Gagal memperbarui penyewa.");
  }

  return data.tenant;
}

async function deleteTenant(id: string) {
  const response = await fetch(`/api/tenants/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = (await response.json()) as { message?: string };

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal menghapus penyewa.");
  }
}

export function TenantManager() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingTenant, setEditingTenant] = React.useState<TenantItem | null>(null);
  const [formName, setFormName] = React.useState("");
  const [formPhone, setFormPhone] = React.useState("");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<TenantItem | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tenants", deferredSearch, page],
    queryFn: () => getTenants(page, deferredSearch),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TenantPayload }) => updateTenant(id, payload),
    onSuccess: async () => {
      setDialogOpen(false);
      setEditingTenant(null);
      setFormError(null);
      await queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
    onError: (err) => {
      setFormError(err instanceof Error ? err.message : "Gagal memperbarui penyewa.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTenant,
    onSuccess: async () => {
      setDeleteTarget(null);
      await queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });

  const tenants = data?.tenants ?? [];
  const meta = data?.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 1, q: "" };

  React.useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  React.useEffect(() => {
    if (meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta.page, page]);

  function openEditDialog(tenant: TenantItem) {
    setEditingTenant(tenant);
    setFormName(tenant.name);
    setFormPhone(tenant.phone ?? "");
    setFormError(null);
    setDialogOpen(true);
  }

  function submitEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingTenant) return;

    if (!formName.trim()) {
      setFormError("Nama penyewa wajib diisi.");
      return;
    }

    setFormError(null);
    updateMutation.mutate({
      id: editingTenant.id,
      payload: { name: formName.trim(), phone: formPhone.trim() },
    });
  }

  return (
    <div className="min-h-screen bg-muted/35 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-start gap-3 rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-sm sm:items-center sm:p-6">
          <SidebarTrigger className="mt-0.5 sm:mt-0" />
          <div className="space-y-2">
            <Badge>Penyewa</Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Daftar penyewa</h1>
              <p className="text-sm text-muted-foreground">
                Penyewa terdaftar otomatis saat mulai sewa lewat Telegram. Edit atau hapus dari sini.
              </p>
            </div>
          </div>
        </header>

        <Card className="bg-card/90">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3">Data penyewa</CardTitle>
              <CardDescription>{meta.total} penyewa tercatat di akun owner ini.</CardDescription>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-10"
                placeholder="Cari nama, nomor HP, atau Telegram ID"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-[1.5rem] border border-border/70">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Penyewa</TableHead>
                    <TableHead>Telegram</TableHead>
                    <TableHead>Sewa Aktif</TableHead>
                    <TableHead>Harga / bulan</TableHead>
                    <TableHead>Mulai Sewa</TableHead>
                    <TableHead>Total Sewa</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        Memuat data penyewa...
                      </TableCell>
                    </TableRow>
                  ) : error instanceof Error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-red-600 dark:text-red-300">
                        {error.message}
                      </TableCell>
                    </TableRow>
                  ) : tenants.length ? (
                    tenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{tenant.name}</p>
                            <p className="text-xs text-muted-foreground">{tenant.phone ?? "-"}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {tenant.telegramId ?? "-"}
                        </TableCell>
                        <TableCell>
                          {tenant.activeRental ? (
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{tenant.activeRental.roomName}</p>
                              <p className="text-xs text-muted-foreground">{tenant.activeRental.kosanName}</p>
                            </div>
                          ) : (
                            <Badge variant="secondary">Tidak aktif</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {tenant.activeRental ? formatRupiah(tenant.activeRental.monthlyPrice) : "-"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {tenant.activeRental ? formatAppDate(tenant.activeRental.startDate) : "-"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{tenant.totalRentals}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="secondary" size="sm" onClick={() => openEditDialog(tenant)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            {!tenant.activeRental && (
                              <Button
                                variant="secondary"
                                size="sm"
                                disabled={deleteMutation.isPending}
                                onClick={() => setDeleteTarget(tenant)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        {search.trim()
                          ? "Penyewa tidak ditemukan untuk pencarian ini."
                          : "Belum ada penyewa. Penyewa akan muncul di sini setelah mulai sewa lewat Telegram."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {tenants.length} dari {meta.total} penyewa
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

        {/* Edit Dialog */}
        <Dialog.Root
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingTenant(null);
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
                    Edit penyewa
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                    {editingTenant
                      ? `Ubah data ${editingTenant.name}`
                      : "Pilih penyewa dulu."}
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

              {editingTenant ? (
                <form className="mt-6 space-y-4" onSubmit={submitEdit}>
                  {editingTenant.telegramId && (
                    <div className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground">
                      <p>
                        Telegram ID: <span className="font-mono font-medium text-foreground">{editingTenant.telegramId}</span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="tenant-name">
                      Nama
                    </label>
                    <Input
                      id="tenant-name"
                      value={formName}
                      disabled={updateMutation.isPending}
                      onChange={(event) => setFormName(event.target.value)}
                      placeholder="Nama penyewa"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="tenant-phone">
                      Nomor HP
                    </label>
                    <Input
                      id="tenant-phone"
                      value={formPhone}
                      disabled={updateMutation.isPending}
                      onChange={(event) => setFormPhone(event.target.value)}
                      placeholder="08123456789"
                    />
                  </div>

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
                      {updateMutation.isPending ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        "Simpan"
                      )}
                    </Button>
                  </div>
                </form>
              ) : null}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Delete Confirmation */}
        <Dialog.Root open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
              <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                Hapus penyewa?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                {deleteTarget
                  ? `Data ${deleteTarget.name} akan dihapus permanen. Aksi ini tidak bisa dibatalkan.`
                  : "Konfirmasi penghapusan."}
              </Dialog.Description>

              {deleteMutation.error ? (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                  {deleteMutation.error instanceof Error
                    ? deleteMutation.error.message
                    : "Gagal menghapus penyewa."}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => setDeleteTarget(null)} disabled={deleteMutation.isPending}>
                  Batal
                </Button>
                <Button
                  onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
                  disabled={deleteMutation.isPending}
                >
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
