"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, ChevronLeft, ChevronRight, LoaderCircle, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type KosanItem = {
  id: string;
  humanId: string;
  name: string;
  address: string;
  description: string | null;
  imageUrls: string[];
  roomsCount: number;
};

type KosanResponse = {
  kosan: KosanItem[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    q: string;
  };
};

type KosanPayload = {
  name: string;
  address: string;
  description: string;
  existingImageUrls: string[];
  newImages: File[];
};

async function getKosan(page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });

  if (q.trim()) {
    params.set("q", q.trim());
  }

  const response = await fetch(`/api/kosan?${params.toString()}`, { credentials: "include" });
  const data = (await response.json()) as { message?: string } & KosanResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal mengambil data kosan.");
  }

  return data;
}

async function createKosan(payload: KosanPayload) {
  const formData = new FormData();
  formData.set("name", payload.name);
  formData.set("address", payload.address);
  formData.set("description", payload.description);
  formData.set("existingImageUrls", JSON.stringify(payload.existingImageUrls));
  payload.newImages.forEach((file) => formData.append("images", file));

  const response = await fetch("/api/kosan", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = (await response.json()) as { message?: string; kosan?: KosanItem };

  if (!response.ok || !data.kosan) {
    throw new Error(data.message ?? "Gagal menambah kosan.");
  }

  return data.kosan;
}

async function updateKosan(id: string, payload: KosanPayload) {
  const formData = new FormData();
  formData.set("name", payload.name);
  formData.set("address", payload.address);
  formData.set("description", payload.description);
  formData.set("existingImageUrls", JSON.stringify(payload.existingImageUrls));
  payload.newImages.forEach((file) => formData.append("images", file));

  const response = await fetch(`/api/kosan/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = (await response.json()) as { message?: string; kosan?: KosanItem };

  if (!response.ok || !data.kosan) {
    throw new Error(data.message ?? "Gagal mengubah kosan.");
  }

  return data.kosan;
}

async function deleteKosan(id: string) {
  const response = await fetch(`/api/kosan/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = (await response.json()) as { message?: string };

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal menghapus kosan.");
  }
}

const emptyForm: KosanPayload = {
  name: "",
  address: "",
  description: "",
  existingImageUrls: [],
  newImages: [],
};

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
            <Image
              src={imageUrl}
              alt="Gambar kosan"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ))}
      </div>

      {images.length > 3 ? (
        <span className="text-xs text-muted-foreground">+{images.length - 3}</span>
      ) : null}
    </div>
  );
}

export function KosanManager() {
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<KosanItem | null>(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);

  const { data, isLoading } = useQuery({
    queryKey: ["kosan", deferredSearch, page],
    queryFn: () => getKosan(page, deferredSearch),
  });

  const kosanList = data?.kosan ?? [];
  const meta = data?.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 1, q: "" };
  const pageItems = getPageItems(meta.page, meta.totalPages);

  React.useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  React.useEffect(() => {
    if (meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta.page, page]);

  const createMutation = useMutation({
    mutationFn: createKosan,
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["kosan"] }),
        queryClient.invalidateQueries({ queryKey: ["kosan-options"] }),
      ]);
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal menambah kosan.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: KosanPayload }) => updateKosan(id, payload),
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["kosan"] }),
        queryClient.invalidateQueries({ queryKey: ["kosan-options"] }),
      ]);
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal mengubah kosan.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteKosan,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["kosan"] }),
        queryClient.invalidateQueries({ queryKey: ["kosan-options"] }),
      ]);
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
  }

  function openCreateDialog() {
    resetForm();
    setDialogOpen(true);
  }

  function startEdit(item: KosanItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      address: item.address,
      description: item.description ?? "",
      existingImageUrls: item.imageUrls ?? [],
      newImages: [],
    });
    setFormError(null);
    setDialogOpen(true);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const payload = {
      name: form.name.trim(),
      address: form.address.trim(),
      description: form.description.trim(),
      existingImageUrls: form.existingImageUrls,
      newImages: form.newImages,
    };

    if (!payload.name || !payload.address) {
      setFormError("Nama kosan dan alamat wajib diisi.");
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
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["kosan"] }),
          queryClient.invalidateQueries({ queryKey: ["kosan-options"] }),
        ]);
      },
    });
  }

  return (
    <div className="min-h-screen bg-muted/35 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-start gap-3 rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-sm sm:items-center sm:p-6">
          <SidebarTrigger className="mt-0.5 sm:mt-0" />
          <div className="space-y-2">
            <Badge>Kosan</Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Kelola kosan</h1>
              <p className="text-sm text-muted-foreground">List data kosan owner.</p>
            </div>
          </div>
        </header>

        <Card className="bg-card/90">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3">Data kosan</CardTitle>
              <CardDescription>{meta.total} kosan tercatat di akun owner ini.</CardDescription>
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
                  Tambah Kosan
                </Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                        {editingId ? "Edit kosan" : "Tambah kosan"}
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                        {editingId ? "Ubah data kosan yang dipilih." : "Masukkan data kosan baru."}
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

                  <form className="mt-6 space-y-4" onSubmit={submitForm}>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="name">
                        Nama kosan
                      </label>
                      <Input
                        id="name"
                        value={form.name}
                        disabled={isSubmitting}
                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                        placeholder="Kosan Melati"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="address">
                        Alamat
                      </label>
                      <Input
                        id="address"
                        value={form.address}
                        disabled={isSubmitting}
                        onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                        placeholder="Jl. Mawar No. 12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="description">
                        Deskripsi
                      </label>
                      <textarea
                        id="description"
                        value={form.description}
                        disabled={isSubmitting}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, description: event.target.value }))
                        }
                        placeholder="Dekat kampus, akses 24 jam, parkir motor."
                        className="flex min-h-28 w-full rounded-3xl border border-border/70 bg-background/90 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="imageUrls">
                        Gambar kosan
                      </label>
                      <Input
                        id="imageUrls"
                        type="file"
                        multiple
                        accept="image/*"
                        disabled={isSubmitting}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            newImages: Array.from(event.target.files ?? []),
                          }))
                        }
                      />
                      <p className="text-xs text-muted-foreground">Bisa upload banyak file sekaligus.</p>

                      {form.existingImageUrls.length ? (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-foreground">Gambar tersimpan</p>
                          <div className="flex flex-wrap gap-2">
                            {form.existingImageUrls.map((imageUrl, index) => (
                              <button
                                key={imageUrl}
                                type="button"
                                className="rounded-md border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground hover:bg-accent"
                                onClick={() =>
                                  setForm((current) => ({
                                    ...current,
                                    existingImageUrls: current.existingImageUrls.filter((_, itemIndex) => itemIndex !== index),
                                  }))
                                }
                              >
                                Hapus gambar {index + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {form.newImages.length ? (
                        <div className="space-y-1 text-xs text-muted-foreground">
                          {form.newImages.map((file) => (
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
                          "Tambah Kosan"
                        )}
                      </Button>
                      <Dialog.Close asChild>
                        <Button type="button" variant="secondary" disabled={isSubmitting}>
                          Batal
                        </Button>
                      </Dialog.Close>
                    </div>
                  </form>
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
                  placeholder="Cari nama atau alamat kosan..."
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
                    <TableHead>HID</TableHead>
                    <TableHead>Nama kosan</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>Gambar</TableHead>
                    <TableHead>Kamar</TableHead>
                    <TableHead className="w-[170px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                        Memuat data kosan...
                      </TableCell>
                    </TableRow>
                  ) : kosanList.length ? (
                    kosanList.map((kosan, index) => (
                      <TableRow key={kosan.id}>
                        <TableCell className="text-muted-foreground">
                          {(meta.page - 1) * meta.pageSize + index + 1}
                        </TableCell>
                        <TableCell className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          {kosan.humanId}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          <div className="space-y-1">
                            <p>{kosan.name}</p>
                            {kosan.description ? (
                              <p className="max-w-xs truncate text-xs text-muted-foreground">
                                {kosan.description}
                              </p>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs whitespace-normal text-muted-foreground">
                          {kosan.address}
                        </TableCell>
                        <TableCell>
                          <ImageStack images={kosan.imageUrls ?? []} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{kosan.roomsCount}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm" onClick={() => startEdit(kosan)}>
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={deleteMutation.isPending}
                              onClick={() => setDeleteTarget(kosan)}
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
                      <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                        {meta.q
                          ? "Data kosan tidak ditemukan untuk pencarian ini."
                          : "Belum ada kosan. Tambah data pertama dari tombol di kanan atas."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Menampilkan {kosanList.length} dari {meta.total} kosan
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
                {deleteMutation.error instanceof Error
                  ? deleteMutation.error.message
                  : "Gagal menghapus kosan."}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Dialog.Root open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
              <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                Hapus kosan?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                {deleteTarget
                  ? `Data ${deleteTarget.name} akan dihapus permanen. Aksi ini tidak bisa dibatalkan.`
                  : "Konfirmasi penghapusan kosan."}
              </Dialog.Description>

              {deleteMutation.error ? (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                  {deleteMutation.error instanceof Error
                    ? deleteMutation.error.message
                    : "Gagal menghapus kosan."}
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
