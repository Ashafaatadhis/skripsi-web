"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { SidebarMenuButton } from "@/components/ui/sidebar";

async function logoutRequest() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout gagal.");
  }
}

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["auth", "session"] });
      router.push("/login");
      router.refresh();
    },
  });

  return (
    <SidebarMenuButton onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      <LogOut className="h-4 w-4" />
      <span>{mutation.isPending ? "Keluar..." : "Logout"}</span>
    </SidebarMenuButton>
  );
}
