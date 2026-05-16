"use client";

import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";

const chatMessages = [
  { from: "user", text: "Halo, ada kamar kosong?" },
  { from: "bot", text: "Halo! 👋 Saat ini tersedia 3 kamar:\n\n🏠 Kamar A3 - Rp 1.2jt/bln\n🏠 Kamar B1 - Rp 1.5jt/bln\n🏠 Kamar C2 - Rp 1.8jt/bln\n\nMau lihat detail yang mana?" },
  { from: "user", text: "Kamar B1 dong" },
  { from: "bot", text: "Kamar B1 🏠\n• AC & Water Heater\n• Kamar mandi dalam\n• WiFi 50 Mbps\n• Ukuran 4x4m\n\nHarga: Rp 1.500.000/bulan\n\nMau booking langsung?" },
];

export function TelegramBotSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary">Telegram Bot</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.72px] sm:text-4xl">
              Cari kamar langsung dari Telegram
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Cukup chat bot kami di Telegram untuk cek ketersediaan kamar,
              lihat fasilitas, dan booking — tanpa perlu download aplikasi
              tambahan.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-muted-foreground">
              <li className="flex items-center gap-2">
                <Bot className="size-4 text-primary" />
                Respon otomatis 24/7
              </li>
              <li className="flex items-center gap-2">
                <Send className="size-4 text-primary" />
                Booking langsung via chat
              </li>
            </ul>
          </motion.div>

          {/* Right - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-[280px]">
              {/* Phone frame */}
              <div className="rounded-[2.5rem] border-[6px] border-black bg-background shadow-xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-10" />

                {/* Telegram header */}
                <div className="bg-[#2AABEE] px-4 pt-7 pb-3 flex items-center gap-2">
                  <div className="size-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="size-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">LallaKost Bot</p>
                    <p className="text-[10px] text-white/70">online</p>
                  </div>
                </div>

                {/* Chat area */}
                <div className="h-[420px] overflow-y-auto bg-muted/30 px-3 py-3 space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.15 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line ${
                          msg.from === "user"
                            ? "bg-[#EFFDDE] dark:bg-[#2B5E3A] text-foreground rounded-br-sm"
                            : "bg-background border border-border text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input bar */}
                <div className="border-t border-border bg-background px-3 py-2 flex items-center gap-2">
                  <div className="flex-1 rounded-full bg-muted px-3 py-1.5 text-[10px] text-muted-foreground">
                    Ketik pesan...
                  </div>
                  <div className="size-6 rounded-full bg-[#2AABEE] flex items-center justify-center">
                    <Send className="size-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
