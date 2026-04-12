"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginResponse = {
  owner: {
    id: string;
    email: string;
    name: string;
  };
};

async function loginRequest(payload: { email: string; password: string; remember: boolean }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as { message?: string } & LoginResponse;

  if (!response.ok) {
    throw new Error(data?.message ?? "Login gagal.");
  }

  return data;
}

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: async (data) => {
      queryClient.setQueryData(["auth", "session"], { owner: data.owner });
      await queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
      router.push("/dashboard");
      router.refresh();
    },
    onError: (mutationError) => {
      setError(mutationError instanceof Error ? mutationError.message : "Login gagal.");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const remember = formData.get("remember") === "on";

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    mutation.mutate({ email, password, remember });
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email owner
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="owner@kosanpay.id"
          autoComplete="email"
          disabled={mutation.isPending}
          defaultValue="owner@kosanpay.id"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <span className="text-sm text-muted-foreground">Gunakan akun seed</span>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan password"
          autoComplete="current-password"
          disabled={mutation.isPending}
          defaultValue="owner123"
        />
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/75 px-4 py-3 text-sm text-muted-foreground dark:bg-background/40">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
          defaultChecked
          disabled={mutation.isPending}
        />
        <label htmlFor="remember">Ingat sesi login di perangkat ini</label>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Memproses..." : "Masuk ke Dashboard"}
      </Button>
    </form>
  );
}
