"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Building2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = ["Produk", "Keamanan", "Harga", "Kontak"];

export function Navbar() {
  const { scrollY } = useScroll();
  const { resolvedTheme } = useTheme();
  const [isPinned, setIsPinned] = useState(false);
  const isDark = resolvedTheme === "dark";
  const scale = useTransform(scrollY, [24, 120], [1, 0.985]);
  const backgroundColor = useTransform(scrollY, [24, 120], isDark
    ? ["rgba(2, 8, 23, 0.6)", "rgba(2, 8, 23, 0.88)"]
    : ["rgba(255, 255, 255, 0.72)", "rgba(255, 255, 255, 0.92)"]);
  const borderColor = useTransform(scrollY, [24, 120], isDark
    ? ["rgba(255, 255, 255, 0.10)", "rgba(255, 255, 255, 0.16)"]
    : ["rgba(148, 163, 184, 0.28)", "rgba(148, 163, 184, 0.42)"]);
  const boxShadow = useTransform(scrollY, [24, 120], isDark
    ? ["0 0 0 rgba(15, 23, 42, 0)", "0 18px 48px rgba(15, 23, 42, 0.35)"]
    : ["0 0 0 rgba(15, 23, 42, 0)", "0 18px 48px rgba(148, 163, 184, 0.24)"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsPinned(latest > 24);
  });

  return (
    <div className="relative h-[88px]">
      <motion.header
        className={isPinned ? "fixed inset-x-0 top-0 z-30 px-4 pt-3 sm:px-6 lg:px-8" : "relative z-20"}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-5 py-4 backdrop-blur-2xl sm:px-6"
        style={{ scale, backgroundColor, borderColor, boxShadow }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/10 dark:ring-white/10">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">KosanPay</p>
            <p className="text-xs text-muted-foreground">Smart kost management</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="transition hover:text-foreground">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-200 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5" />
            Sistem aman
          </div>
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            Masuk Demo
          </Link>
        </div>
      </motion.div>
      </motion.header>
    </div>
  );
}
