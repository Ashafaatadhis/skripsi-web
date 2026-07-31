"use client";

import { Bath, Car, MapPin, Shield, Thermometer, Wifi } from "lucide-react";
import { motion } from "framer-motion";

const facilities = [
  { icon: Wifi, label: "WiFi cepat di setiap kamar" },
  // { icon: Thermometer, label: "AC & water heater" },
  { icon: Bath, label: "Kamar mandi dalam" },
  { icon: Car, label: "Parkir motor & mobil" },
  { icon: Shield, label: "CCTV & keamanan 24 jam" },
  { icon: MapPin, label: "5 menit dari kampus" },
];

const images = [
  {
    src: "/gambar1kos.jpg",
    alt: "Kamar kos",
  },
  {
    src: "/gambar2kos.jpg",
    alt: "Fasilitas kos",
  },
  {
    src: "/gambar3kos.jpg",
    alt: "Ruang bersama",
  },
  {
    src: "/gambar4kos.jpg",
    alt: "Area kos",
  },
];

export function FeaturesSection() {
  return (
    <section id="fasilitas" className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left - text + list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
            className="lg:col-span-2"
          >
            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-sm font-medium text-primary"
            >
              Fasilitas
            </motion.p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.72px] sm:text-4xl">
              {"Semua yang kamu butuhkan, sudah tersedia"
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, filter: "blur(8px)" },
                      visible: { opacity: 1, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.4 }}
                    className="mr-[0.25em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
            </h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-4 text-base text-muted-foreground"
            >
              Tinggal bawa koper dan langsung produktif. Semua fasilitas siap
              pakai dari hari pertama.
            </motion.p>

            <ul className="mt-8 divide-y border-y">
              {facilities.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                    className="flex items-center gap-3 py-3 text-[15px]"
                  >
                    <Icon className="size-4 text-primary" />
                    {item.label}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Right - image grid */}
          <div className="group grid grid-cols-2 gap-3 lg:col-span-3">
            {images.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="overflow-hidden rounded-lg border border-border transition-all duration-500 group-hover:scale-[0.97] group-hover:opacity-60 group-hover:blur-[2px] hover:!scale-105 hover:!opacity-100 hover:!blur-none"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
