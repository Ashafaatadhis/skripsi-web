"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FloatingPaths } from "@/components/ui/background-paths";

export function CTASection() {
  return (
    <section id="kontak" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-medium tracking-[-0.72px] text-foreground sm:text-4xl">
            Siap pindah ke Kost Tofu?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            Kamar terbatas setiap bulannya. Chat kami di Telegram untuk cek
            ketersediaan dan langsung booking kamar impianmu.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://t.me/KosanTenantBot" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full gap-2">
                <MessageCircle className="size-4" />
                Hubungi via Telegram
              </Button>
            </a>
            <Button size="lg" variant="secondary" className="rounded-full gap-2 border-border">
              Lihat Lokasi
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
