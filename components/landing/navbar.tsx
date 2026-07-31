"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Building2 } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent",
        scrolled &&
          "border-border bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50"
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 rounded-md p-2 hover:bg-accent">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <Building2 className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium">Kost Tofu</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <Link href="/login">
            <Button size="sm">Masuk Owner</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="h-10 w-10 p-0"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu open={open}>
        <div className="grid gap-y-1">
          {links.map((link) => (
            <a
              key={link.label}
              className={buttonVariants({
                variant: "ghost",
                className: "justify-start",
              })}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button className="w-full">Masuk Owner</Button>
          </Link>
        </div>
      </MobileMenu>
    </header>
  );
}

function MobileMenu({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col overflow-hidden border-t bg-background/95 backdrop-blur-lg md:hidden">
      <div className="flex size-full animate-in fade-in zoom-in-97 flex-col justify-between p-4">
        {children}
      </div>
    </div>,
    document.body
  );
}
