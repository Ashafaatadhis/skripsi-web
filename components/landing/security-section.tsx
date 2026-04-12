import { Fingerprint, LockKeyhole, ShieldCheck, WalletCards } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const securityItems = [
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description: "Akses web difokuskan untuk satu owner agar data bisnis dan operasional tetap terkontrol.",
  },
  {
    icon: Fingerprint,
    title: "Audit activity",
    description: "Semua aktivitas penting bisa dilacak untuk kebutuhan monitoring dan evaluasi.",
  },
  {
    icon: LockKeyhole,
    title: "Secure authentication",
    description: "Alur login owner dirancang sederhana dan aman untuk dashboard pengelolaan bisnis kos.",
  },
  {
    icon: WalletCards,
    title: "Payment confidence",
    description: "Status pembayaran divisualkan jelas agar owner cepat mengambil tindakan yang tepat.",
  },
];

export function SecuritySection() {
  return (
    <section className="grid gap-6 pt-6 pb-14 sm:pt-8 sm:pb-16 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="bg-gradient-to-br from-cyan-100 via-white to-slate-100 p-8 dark:from-cyan-400/18 dark:via-slate-950 dark:to-slate-950">
        <Badge className="mb-5">Security highlights</Badge>
        <h2 className="max-w-md text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Trust-building design yang didukung pesan keamanan yang kuat.
        </h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">
          Nuansa biru, cyan, dan slate memberi kesan stabil dan kredibel, sementara kartu
          glassmorphism menjaga tampilan tetap premium untuk presentasi skripsi.
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {securityItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-white/10 dark:text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
