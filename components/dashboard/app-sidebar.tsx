"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Building2,
  DoorOpen,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/components/auth/logout-button";
import { OwnerSummary } from "@/components/dashboard/owner-summary";

const mainItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Kosan", href: "/dashboard/kosan", icon: Building2 },
  { title: "Kamar", href: "/dashboard/kamar", icon: DoorOpen },
  { title: "Sewa", href: "/dashboard/sewa", icon: BookOpen },
  { title: "Pembayaran", href: "/dashboard/pembayaran", icon: CreditCard },
];

type AppSidebarProps = {
  owner: {
    id: string;
    email: string;
    name: string;
  } | null;
};

export function AppSidebar({ owner }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">KosanPay</p>
            <p className="text-xs text-muted-foreground">Owner dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu utama</SidebarGroupLabel>
          <SidebarMenu>
            {mainItems.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="space-y-3">
          <OwnerSummary owner={owner} />
          <SidebarMenu>
            <SidebarMenuItem>
              <LogoutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
