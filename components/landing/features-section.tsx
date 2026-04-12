import { BarChart3, Building2, CreditCard, MessageSquareText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: CreditCard,
    title: "Pembayaran digital",
    description:
      "Ringkas proses tagihan bulanan, validasi transfer, dan rekap pembayaran penghuni.",
  },
  {
    icon: Building2,
    title: "Kontrol kamar",
    description:
      "Lihat ketersediaan kamar, histori penyewa, dan status hunian dari banyak kosan dalam satu panel.",
  },
  {
    icon: MessageSquareText,
    title: "Pengingat otomatis",
    description:
      "Kirim reminder pembayaran dan notifikasi operasional tanpa kerja manual berulang.",
  },
  {
    icon: BarChart3,
    title: "Insight pemasukan",
    description:
      "Analisis tren keterisian, arus kas, dan performa properti untuk keputusan lebih cepat.",
  },
];

export function FeaturesSection() {
  return (
    <section className="space-y-8 pt-6 pb-14 sm:pt-8 sm:pb-16">
      <div className="max-w-3xl space-y-4">
        <Badge>Transaction features</Badge>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Fitur utama untuk satu owner yang mengelola banyak kosan dan banyak kamar.
        </h2>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
          Visual yang bersih dan profesional membantu membangun trust sejak first impression,
          sambil tetap menonjolkan alur pembayaran dan operasional harian.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.title} className="h-full bg-white/75 dark:bg-white/8">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/10">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="pt-4 text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                  <CardDescription className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                   {feature.description}
                 </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
