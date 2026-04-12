import { CheckCheck, MessageCircleMore, Paperclip, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AppDownloadSection() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center pt-8 pb-14 sm:pt-10 sm:pb-16">
      <Card className="relative w-full overflow-hidden bg-gradient-to-r from-cyan-50 via-white to-sky-100 p-8 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/80 sm:p-10 lg:p-12">
        <div className="absolute -right-12 top-8 h-44 w-44 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-300/20" />
        <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <Badge>Telegram tenant flow</Badge>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Penyewa tetap terhubung lewat Telegram untuk tagihan, pengingat, dan bantuan cepat.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Owner fokus mengelola bisnis lewat web, sementara penyewa menerima alur utama
              melalui Telegram tanpa perlu login ke dashboard terpisah.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                <Send className="h-4 w-4" />
                Buka Telegram Bot
              </Button>
              <Button variant="secondary" size="lg">
                <MessageCircleMore className="h-4 w-4" />
                Lihat Alur Chat
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] rounded-[2rem] border border-slate-200/80 bg-white/85 p-3 shadow-[0_40px_100px_-60px_rgba(56,189,248,0.38)] backdrop-blur-2xl dark:border-white/15 dark:bg-white/10 dark:shadow-[0_40px_100px_-60px_rgba(56,189,248,0.9)]">
              <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-[#e9f2fb] text-slate-950 dark:border-white/10 dark:bg-[#17212b] dark:text-white">
                <div className="flex items-center gap-3 border-b border-slate-200 bg-[#f8fbff] px-4 py-3 dark:border-white/10 dark:bg-[#1f2c38]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-700 dark:text-cyan-100">
                    KP
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">KosanPay Bot</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">online • balas otomatis</p>
                  </div>
                  <div className="rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:text-cyan-100">
                    Telegram
                  </div>
                </div>

                <div className="space-y-3 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.10),_transparent_42%),linear-gradient(180deg,#eef7ff_0%,#dfeffd_100%)] px-4 py-4 dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_42%),linear-gradient(180deg,#0f1720_0%,#16202a_100%)]">
                  <div className="mx-auto w-fit rounded-full bg-white/80 px-3 py-1 text-[11px] text-slate-500 dark:bg-white/10 dark:text-slate-300">
                    Hari ini
                  </div>

                  <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-white/90 px-3.5 py-3 text-sm leading-6 text-slate-700 shadow-sm dark:bg-white/8 dark:text-slate-100">
                    Halo, Raka. Tagihan kos untuk kamar A-12 jatuh tempo besok sebesar
                    <span className="font-semibold text-slate-950 dark:text-white"> Rp850.000</span>.
                    Mau lihat detail atau upload bukti bayar?
                    <div className="mt-1 text-[11px] text-slate-400 dark:text-slate-400">08.14</div>
                  </div>

                  <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-[#2b5278] px-3.5 py-3 text-sm leading-6 text-white shadow-lg shadow-sky-950/20">
                    Kirim detail tagihan ya, sekalian total denda kalau lewat hari ini.
                    <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-cyan-100/90">
                      08.15
                      <CheckCheck className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/90 px-3.5 py-3 text-sm leading-6 text-slate-700 shadow-sm dark:bg-white/8 dark:text-slate-100">
                    Rincian tagihan bulan April:
                    <div className="mt-2 space-y-1 text-[13px] text-slate-600 dark:text-slate-200">
                      <div className="flex items-center justify-between gap-4">
                        <span>Sewa kamar</span>
                        <span>Rp800.000</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Listrik & air</span>
                        <span>Rp50.000</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 font-semibold text-slate-950 dark:text-white">
                        <span>Total hari ini</span>
                        <span>Rp850.000</span>
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">08.15</div>
                  </div>

                  <div className="ml-auto max-w-[72%] rounded-2xl rounded-tr-md bg-[#2b5278] px-3.5 py-3 text-sm leading-6 text-white shadow-lg shadow-sky-950/20">
                    Oke, nanti saya upload bukti transfer di sini.
                    <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-cyan-100/90">
                      08.16
                      <CheckCheck className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-200 bg-[#f8fbff] px-4 py-3 text-slate-500 dark:border-white/10 dark:bg-[#1f2c38] dark:text-slate-300">
                  <Paperclip className="h-4 w-4" />
                  <div className="flex-1 rounded-full bg-white/85 px-4 py-2 text-sm text-slate-400 dark:bg-white/8">
                    Tulis pesan...
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-slate-950">
                    <Send className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
