"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, SparklesIcon, PlayIcon } from "lucide-react";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { TextRotate } from "@/components/ui/text-rotate";
import { useQuery } from "@tanstack/react-query";

export function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-5xl">
      {/* Animated grid background */}
      <AnimatedGrid
        rows={14}
        cols={20}
        className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center gap-5 px-4 pt-32 pb-20 sm:px-6">

        {/* Announcement badge */}
        <a
          className="group mx-auto flex w-fit items-center gap-3 rounded-full border border-border bg-background px-3 py-1 shadow-sm"
          href="#fasilitas"
        >
          <SparklesIcon className="size-3 text-primary" />
          <span className="text-xs text-muted-foreground">
            Kos modern, hidup nyaman
          </span>
          <span className="block h-4 border-l border-border" />
          <ArrowRightIcon className="size-3 text-muted-foreground duration-150 ease-out group-hover:translate-x-0.5" />
        </a>

        {/* Headline */}
        <h1 className="text-center text-2xl font-medium tracking-[-0.8px] sm:text-3xl md:text-4xl lg:text-5xl lg:tracking-[-1.4px]">
          <span className="flex flex-wrap items-center justify-center gap-2">
            <span>Tempat Tinggal</span>
            <TextRotate
              texts={[
                "Nyaman",
                "Strategis",
                "Terjangkau",
                "Modern",
              ]}
              mainClassName="text-primary-foreground px-2 py-0.5 sm:px-3 sm:py-1 bg-primary overflow-hidden justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </span>
          <span className="block">di Tengah Kota Depok</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-lg text-center text-base text-muted-foreground sm:text-lg">
          Kost Tofu menyediakan hunian kos dengan WiFi cepat, kamar mandi dalam,
          dan lokasi dekat kampus. Tinggal fokus kuliah, urusan tempat tinggal biar kami yang urus.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2">
          <Button className="rounded-full border-border" size="lg" variant="secondary">
            <PlayIcon className="mr-2 size-4" />
            Lihat Virtual Tour
          </Button>
          <a href="https://t.me/KosanTenantBot" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full" size="lg">
              Chat via Telegram
              <ArrowRightIcon className="ms-2 size-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

type PublicStats = {
  activeTenants: number;
  kosanCount: number;
};

async function getPublicStats(): Promise<PublicStats> {
  const response = await fetch("/api/public/stats");
  if (!response.ok) {
    return { activeTenants: 0, kosanCount: 0 };
  }
  return response.json();
}

export function LogosSection() {
  const { data } = useQuery({
    queryKey: ["public-stats"],
    queryFn: getPublicStats,
    staleTime: 5 * 60 * 1000,
  });

  const activeTenants = data?.activeTenants ?? 0;
  const kosanCount = data?.kosanCount ?? 0;

  return (
    <section className="py-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 px-4 sm:gap-12 md:gap-16">
        <div className="text-center">
          <p className="text-2xl font-medium text-foreground sm:text-3xl">{activeTenants}+</p>
          <p className="mt-1 text-sm text-muted-foreground">Penghuni aktif</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-medium text-foreground sm:text-3xl">5.0★</p>
          <p className="mt-1 text-sm text-muted-foreground">Rating Google</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-medium text-foreground sm:text-3xl">{kosanCount}</p>
          <p className="mt-1 text-sm text-muted-foreground">Lokasi di Depok</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-medium text-foreground sm:text-3xl">24/7</p>
          <p className="mt-1 text-sm text-muted-foreground">Keamanan aktif</p>
        </div>
      </div>
    </section>
  );
}
