"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  LoaderCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type KamarItem = {
  id: string;
  humanId: string;
  name: string;
  monthlyPrice: number;
  quantity: number;
  imageUrls: string[];
  facilities: string[];
  bookedCount: number;
  availableQuantity: number;
  kosanId: string;
  kosanName: string;
};

type KamarResponse = {
  rooms: KamarItem[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    q: string;
  };
};

type KosanOption = {
  id: string;
  name: string;
};

type KamarPayload = {
  kosanId: string;
  name: string;
  monthlyPrice: number;
  quantity: number;
  existingImageUrls: string[];
  facilities: string[];
  newImages: File[];
};

const emptyForm: KamarPayload = {
  kosanId: "",
  name: "",
  monthlyPrice: 0,
  quantity: 0,
  existingImageUrls: [],
  facilities: [],
  newImages: [],
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getAvailabilityLabel(availableQuantity: number) {
  return availableQuantity > 0 ? "Tersedia" : "Penuh";
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
            <Image src={imageUrl} alt="Gambar kamar" fill className="object-cover" sizes="64px" />
          </div>
        ))}
      </div>

      {images.length > 3 ? (
        <span className="text-xs text-muted-foreground">+{images.length - 3}</span>
      ) : null}
    </div>
  );
}

async function getKamar(page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });

  if (q.trim()) {
    params.set("q", q.trim());
  }

  const response = await fetch(`/api/kamar?${params.toString()}`, { credentials: "include" });
  const data = (await response.json()) as { message?: string } & KamarResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal mengambil data kamar.");
  }

  return data;
}

async function getKosanOptions() {
  const response = await fetch("/api/options/kosan", { credentials: "include" });
  const data = (await response.json()) as { message?: string; kosan?: KosanOption[] };

  if (!response.ok || !data.kosan) {
    throw new Error(data.message ?? "Gagal mengambil daftar kosan.");
  }

  return data.kosan;
}

async function createKamar(payload: KamarPayload) {
  const formData = new FormData();
  formData.set("kosanId", payload.kosanId);
  formData.set("name", payload.name);
  formData.set("monthlyPrice", String(payload.monthlyPrice));
  formData.set("quantity", String(payload.quantity));
  payload.existingImageUrls.forEach((url) => formData.append("existingImageUrls", url));
  payload.facilities.forEach((f) => formData.append("facilities", f));
  payload.newImages.forEach((file) => formData.append("images", file));

  const response = await fetch("/api/kamar", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = (await response.json()) as { message?: string; room?: KamarItem };

  if (!response.ok || !data.room) {
    throw new Error(data.message ?? "Gagal menambah kamar.");
  }

  return data.room;
}

async function updateKamar(id: string, payload: KamarPayload) {
  const formData = new FormData();
  formData.set("kosanId", payload.kosanId);
  formData.set("name", payload.name);
  formData.set("monthlyPrice", String(payload.monthlyPrice));
  formData.set("quantity", String(payload.quantity));
  payload.existingImageUrls.forEach((url) => formData.append("existingImageUrls", url));
  payload.facilities.forEach((f) => formData.append("facilities", f));
  payload.newImages.forEach((file) => formData.append("images", file));

  const response = await fetch(`/api/kamar/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = (await response.json()) as { message?: string; room?: KamarItem };

  if (!response.ok || !data.room) {
    throw new Error(data.message ?? "Gagal mengubah kamar.");
  }

  return data.room;
}

async function deleteKamar(id: string) {
  const response = await fetch(`/api/kamar/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = (await response.json()) as { message?: string };

  if (!response.ok) {
    throw new Error(data.message ?? "Gagal menghapus kamar.");
  }
}

export function KamarManager() {
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<KamarPayload>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [facilityInput, setFacilityInput] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<KamarItem | null>(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);

  const { data, isLoading } = useQuery({
    queryKey: ["kamar", deferredSearch, page],
    queryFn: () => getKamar(page, deferredSearch),
  });

  const {
    data: kosanOptions = [],
    isLoading: isKosanOptionsLoading,
    error: kosanOptionsError,
    refetch: refetchKosanOptions,
  } = useQuery({
    queryKey: ["kosan-options"],
    queryFn: getKosanOptions,
  });

  const kamarList = data?.rooms ?? [];
  const meta = data?.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 1, q: "" };
  const pageItems = getPageItems(meta.page, meta.totalPages);

  React.useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  React.useEffect(() => {
    if (!form.kosanId && kosanOptions.length) {
      setForm((current) => ({ ...current, kosanId: kosanOptions[0]?.id ?? "" }));
    }
  }, [form.kosanId, kosanOptions]);

  React.useEffect(() => {
    if (meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta.page, page]);

  const createMutation = useMutation({
    mutationFn: createKamar,
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["kamar"] });
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal menambah kamar.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: KamarPayload }) => updateKamar(id, payload),
    onSuccess: async () => {
      resetForm();
      setDialogOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["kamar"] });
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Gagal mengubah kamar.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteKamar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kamar"] });
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function resetForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      kosanId: kosanOptions[0]?.id ?? "",
    });
    setFormError(null);
    setFacilityInput("");
  }

  function openCreateDialog() {
    resetForm();
    void refetchKosanOptions();
    setDialogOpen(true);
  }

  function startEdit(item: KamarItem) {
    setEditingId(item.id);
    setForm({
      kosanId: item.kosanId,
      name: item.name,
      monthlyPrice: item.monthlyPrice,
      quantity: item.quantity,
      existingImageUrls: item.imageUrls ?? [],
      facilities: item.facilities ?? [],
      newImages: [],
    });
    setFacilityInput("");
    setFormError(null);
    setDialogOpen(true);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const payload = {
      kosanId: form.kosanId.trim(),
      name: form.name.trim(),
      monthlyPrice: Number(form.monthlyPrice),
      quantity: Number(form.quantity),
      existingImageUrls: form.existingImageUrls,
      facilities: form.facilities,
      newImages: form.newImages,
    };

    if (
      !payload.kosanId ||
      !payload.name ||
      !Number.isFinite(payload.monthlyPrice) ||
      payload.monthlyPrice <= 0 ||
      !Number.isInteger(payload.quantity) ||
      payload.quantity < 0
    ) {
      setFormError("Kosan, nama kamar, harga bulanan, dan quantity wajib diisi dengan benar.");
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
        await queryClient.invalidateQueries({ queryKey: ["kamar"] });
      },
    });
  }

  return (
    <div className="min-h-screen bg-muted/35 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-start gap-3 rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-sm sm:items-center sm:p-6">
          <SidebarTrigger className="mt-0.5 sm:mt-0" />
          <div className="space-y-2">
            <Badge>Kamar</Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Kelola kamar</h1>
              <p className="text-sm text-muted-foreground">List data kamar owner.</p>
            </div>
          </div>
        </header>

        <Card className="bg-card/90">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <DoorOpen className="h-5 w-5" />
              </div>
              <CardTitle className="mt-3">Data kamar</CardTitle>
              <CardDescription>{meta.total} kamar tercatat di akun owner ini.</CardDescription>
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
                  Tambah Kamar
                </Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                        {editingId ? "Edit kamar" : "Tambah kamar"}
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                        {editingId ? "Ubah data kamar yang dipilih." : "Masukkan data kamar baru."}
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

                  {isKosanOptionsLoading ? (
                    <div className="mt-6 rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
                      Memuat daftar kosan...
                    </div>
                  ) : kosanOptionsError ? (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-600 dark:text-red-300">
                        {kosanOptionsError instanceof Error
                          ? kosanOptionsError.message
                          : "Gagal mengambil daftar kosan."}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button type="button" onClick={() => void refetchKosanOptions()}>
                          Coba Lagi
                        </Button>
                        <Dialog.Close asChild>
                          <Button type="button" variant="secondary">
                            Tutup
                          </Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  ) : kosanOptions.length ? (
                    <form className="mt-6 space-y-4" onSubmit={submitForm}>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="kosanId">
                          Kosan
                        </label>
                        <select
                          id="kosanId"
                          value={form.kosanId}
                          disabled={isSubmitting}
                          onChange={(event) => setForm((current) => ({ ...current, kosanId: event.target.value }))}
                          className="flex h-12 w-full rounded-2xl border border-border/70 bg-background/90 px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/50"
                        >
                          {kosanOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="name">
                          Nama kamar
                        </label>
                        <Input
                          id="name"
                          value={form.name}
                          disabled={isSubmitting}
                          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                          placeholder="Kamar Reguler"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="monthlyPrice">
                          Harga bulanan
                        </label>
                        <Input
                          id="monthlyPrice"
                          type="number"
                          min={0}
                          value={form.monthlyPrice || ""}
                          disabled={isSubmitting}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, monthlyPrice: Number(event.target.value) }))
                          }
                          placeholder="850000"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="quantity">
                          Quantity kamar
                        </label>
                        <Input
                          id="quantity"
                          type="number"
                          min={0}
                          step={1}
                          value={Number.isNaN(form.quantity) ? "" : form.quantity}
                          disabled={isSubmitting}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, quantity: Number(event.target.value) }))
                          }
                          placeholder="3"
                        />
                        <p className="text-xs text-muted-foreground">
                          Jika quantity 0, kamar akan dianggap penuh.
                        </p>
                      </div>
 
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="facilities">
                          Fasilitas Kamar
                        </label>
                        <div className="flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-background/90 p-2 focus-within:ring-2 focus-within:ring-ring/60 focus-within:ring-offset-2 focus-within:ring-offset-background dark:bg-background/50">
                          {form.facilities.map((facility, index) => (
                            <Badge key={`${facility}-${index}`} variant="secondary" className="gap-1 rounded-lg">
                              {facility}
                              <button
                                type="button"
                                onClick={() =>
                                  setForm((c) => ({ ...c, facilities: c.facilities.filter((_, i) => i !== index) }))
                                }
                                className="ml-1 rounded-full outline-none ring-offset-background hover:bg-muted focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Hapus {facility}</span>
                              </button>
                            </Badge>
                          ))}
                          <input
                            type="text"
                            value={facilityInput}
                            disabled={isSubmitting}
                            onChange={(e) => setFacilityInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const val = facilityInput.trim();
                                if (val && !form.facilities.includes(val)) {
                                  setForm((c) => ({ ...c, facilities: [...c.facilities, val] }));
                                  setFacilityInput("");
                                }
                              }
                            }}
                            placeholder="Ketik AC, tab/enter..."
                            className="flex-1 min-w-[120px] bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Tekan Enter untuk menambah fasilitas.</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="imageUrls">
                          Gambar kamar
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
                            "Tambah Kamar"
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
                        Belum ada kosan. Buat kosan dulu supaya kamar bisa ditambahkan.
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Dialog.Close asChild>
                          <Button asChild>
                            <Link href="/dashboard/kosan">Ke Halaman Kosan</Link>
                          </Button>
                        </Dialog.Close>
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
                  placeholder="Cari nama kamar atau kosan..."
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
                    <TableHead>Kamar</TableHead>
                     <TableHead>Kosan</TableHead>
                    <TableHead>Fasilitas</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Gambar</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Kosong</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[170px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
                        Memuat data kamar...
                      </TableCell>
                    </TableRow>
                  ) : kamarList.length ? (
                    kamarList.map((kamar, index) => (
                      <TableRow key={kamar.id}>
                        <TableCell className="text-muted-foreground">
                          {(meta.page - 1) * meta.pageSize + index + 1}
                        </TableCell>
                        <TableCell className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          {kamar.humanId}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{kamar.name}</TableCell>
                         <TableCell className="text-muted-foreground">{kamar.kosanName}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {kamar.facilities?.map((f, i) => (
                              <Badge key={i} variant="outline" className="px-1.5 py-0 text-[10px] font-normal lowercase">
                                {f}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatRupiah(kamar.monthlyPrice)}</TableCell>
                        <TableCell>
                          <ImageStack images={kamar.imageUrls ?? []} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{kamar.quantity}</TableCell>
                        <TableCell className="text-muted-foreground">{kamar.availableQuantity}</TableCell>
                        <TableCell>
                          <span className="inline-flex rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                            {getAvailabilityLabel(kamar.availableQuantity)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm" onClick={() => startEdit(kamar)}>
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={deleteMutation.isPending}
                              onClick={() => setDeleteTarget(kamar)}
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
                          ? "Data kamar tidak ditemukan untuk pencarian ini."
                          : kosanOptions.length
                            ? "Belum ada kamar. Tambah data pertama dari tombol di kanan atas."
                            : "Buat kosan dulu sebelum menambahkan kamar."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Menampilkan {kamarList.length} dari {meta.total} kamar
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
                {deleteMutation.error instanceof Error ? deleteMutation.error.message : "Gagal menghapus kamar."}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Dialog.Root open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] outline-none">
              <Dialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                Hapus kamar?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                {deleteTarget
                  ? `Data kamar ${deleteTarget.name} akan dihapus permanen. Aksi ini tidak bisa dibatalkan.`
                  : "Konfirmasi penghapusan kamar."}
              </Dialog.Description>

              {deleteMutation.error ? (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                  {deleteMutation.error instanceof Error ? deleteMutation.error.message : "Gagal menghapus kamar."}
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
