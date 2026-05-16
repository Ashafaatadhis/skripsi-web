"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGridProps {
  rows?: number;
  cols?: number;
  className?: string;
}

export function AnimatedGrid({
  rows = 12,
  cols = 16,
  className,
}: AnimatedGridProps) {
  const [activeSquares, setActiveSquares] = useState<Set<number>>(new Set());
  const total = rows * cols;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSquares((prev) => {
        const next = new Set(prev);
        // Remove some old ones
        for (const idx of next) {
          if (Math.random() < 0.25) next.delete(idx);
        }
        // Add random batch (1-5 cells at once)
        const count = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < count; i++) {
          next.add(Math.floor(Math.random() * total));
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              "border-[0.5px] border-border/30 transition-colors duration-700",
              activeSquares.has(i)
                ? "bg-primary/15"
                : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}
