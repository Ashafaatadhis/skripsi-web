"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Suryati",
    role: "Orang tua penghuni",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=60",
    text: "Masyallah, kost murah dan nyaman... samping masjid. Alhamdulillah anak saya betah, karena pemilik dan penjaga ramah dan sangat membantu. Dekat juga dengan stasiun Pondok Cina, cuma 8 menit jalan kaki.",
    rating: 5,
    featured: true,
  },
  {
    name: "Muhammad Dafalaah",
    role: "Mahasiswa Gunadarma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&q=60",
    text: "Kostan ternyaman, bersih, aman, cozy, lingkungannya strategis deket warung makan, masjid, resto, mall, universitas Gunadarma. Penjaga dan pemilik kostnya ramah, baik, harganya terjangkau banget untuk ukuran kamar mandi dalam + WiFi.",
    rating: 5,
    featured: false,
  },
  {
    name: "Lisda Khaironisa",
    role: "Penghuni kos",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&q=60",
    text: "Kosannya bagus, aman juga. Bapak kosnya baik, strategis, dekat masjid, ke kampus tinggal nyebrang.",
    rating: 5,
    featured: false,
  },
  {
    name: "Penghuni 1",
    role: "Review Google Maps",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&q=60",
    text: "Banyak warteg, fried chicken, nasgor, soto, makanan arab, kafe pun dekat.",
    rating: 5,
    featured: false,
  },
  {
    name: "Penghuni 2",
    role: "Review Google Maps",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&auto=format&fit=crop&q=60",
    text: "Kost ternyaman untuk warga Depok, fasilitas oke banget, sangat rekomen! 👍🏼",
    rating: 5,
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TestimonialsSection() {
  const featured = testimonials[0];
  const others = testimonials.slice(1);

  return (
    <section id="testimoni" className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-sm font-medium text-primary">Testimoni Penghuni</p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.72px] sm:text-4xl">
            Kata mereka yang sudah tinggal di Kost Tofu
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Featured card - large */}
          <motion.div
            variants={cardVariants}
            className="relative flex flex-col justify-between rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:row-span-2"
          >
            <div>
              <Quote className="size-8 text-primary/20" />
              <p className="mt-4 text-xl font-medium leading-relaxed">
                &ldquo;{featured.text}&rdquo;
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <img
                src={featured.avatar}
                alt={featured.name}
                className="size-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{featured.name}</p>
                <p className="text-sm text-muted-foreground">{featured.role}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Other cards */}
          {others.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="size-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
