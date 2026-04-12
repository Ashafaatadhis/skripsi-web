import Image from "next/image";
import {
  ArrowRight,
  BedDouble,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const stats = [
  { label: "Pembayaran tertagih", value: "98.6%" },
  { label: "Unit terpantau", value: "240+" },
  { label: "Waktu respon", value: "< 2 mnt" },
];

export function HeroSection() {
  return (
    <section className="grid min-h-[calc(100vh-8rem)] items-center gap-10 pt-4 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pt-6 lg:pb-10">
      <div className="max-w-2xl space-y-8 lg:self-center">
        <div className="space-y-5">
          <Badge className="gap-2 text-[11px]">
            <Sparkles className="h-3.5 w-3.5" />
            Banking-grade experience untuk bisnis kosan
          </Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Landing page trust-first untuk operasional kost yang terasa
              modern.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Kelola banyak kosan, pantau status kamar, dan rapikan operasional
              dari satu dashboard owner yang aman, rapi, dan siap jadi wajah
              utama bisnis kos Anda.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="group">
            Lihat Preview
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" size="lg">
            <Play className="h-4 w-4" />
            Tonton Demo
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/70 bg-card/75 px-5 py-4 shadow-[0_20px_45px_-30px_rgba(148,163,184,0.35)] backdrop-blur-xl dark:bg-card/40 dark:shadow-none"
            >
              <p className="text-xl font-semibold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-300" />
          Satu akun owner, audit trail jelas, dan notifikasi pembayaran real-time.
        </div>
      </div>

      <div className="relative flex items-center justify-center lg:justify-end">
        <div className="absolute inset-x-10 top-10 h-56 rounded-full bg-cyan-400/18 blur-3xl dark:bg-cyan-400/20" />
        <div className="relative w-full max-w-2xl">
          <div className="absolute -left-3 top-8 z-10 rounded-2xl border border-border/70 bg-card/88 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-left-6">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
              Properti aktif
            </p>
            <div className="mt-2 flex items-center gap-2 text-foreground">
              <BedDouble className="h-4 w-4 text-emerald-500 dark:text-emerald-300" />
              <span className="text-sm font-medium">24 kamar siap huni</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/75 shadow-[0_40px_100px_-60px_rgba(14,165,233,0.30)] backdrop-blur-xl dark:bg-card/30 dark:shadow-[0_40px_100px_-60px_rgba(34,211,238,0.55)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/kosan-hero.jpg"
                alt="Bangunan kos modern dengan fasad bersih dan balkon"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent dark:from-slate-950/80 dark:via-slate-950/10" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="rounded-[1.5rem] border border-border/70 bg-card/90 p-5 backdrop-blur-2xl dark:bg-slate-950/70">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
                      Kosan unggulan
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
                      Kos Harian & Bulanan Nuansa Modern
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                      Lokasi strategis dekat kampus dan area kuliner.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-200">
                    Hunian 93% terisi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
