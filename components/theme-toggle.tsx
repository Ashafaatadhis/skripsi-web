"use client";

import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="secondary"
      size="sm"
      type="button"
      aria-label={isDark ? "Aktifkan light mode" : "Aktifkan dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="px-3"
      suppressHydrationWarning
    >
      {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
