import {
  Building2,
  CheckCircle2,
  Globe,
  MessageCircleMore,
  ShieldCheck,
} from "lucide-react";

const footerGroups = [
  {
    title: "Produk",
    links: [
      "Dashboard Owner",
      "Monitoring Kamar",
      "Pembayaran Penghuni",
      "Laporan Operasional",
    ],
  },
  {
    title: "Perusahaan",
    links: [
      "Tentang Proyek",
      "Use Case Skripsi",
      "Arsitektur Sistem",
      "Roadmap Produk",
    ],
  },
  {
    title: "Resource",
    links: [
      "Panduan Owner",
      "Alur Telegram Tenant",
      "FAQ Pembayaran",
      "Dokumentasi API",
    ],
  },
  {
    title: "Legal",
    links: [
      "Kebijakan Privasi",
      "Syarat Penggunaan",
      "Keamanan Data",
      "Audit Aktivitas",
    ],
  },
];

const socialLinks = [
  { label: "Telegram", icon: MessageCircleMore },
  { label: "Website", icon: Globe },
  { label: "Owner Portal", icon: Building2 },
];

export function Footer() {
  return (
    <footer className="mt-6 border-t border-border pt-12 pb-8 text-sm text-muted-foreground sm:pt-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_repeat(4,0.8fr)] lg:gap-8">
        <div className="max-w-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/10 dark:ring-white/10">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-foreground">KosanPay</p>
              <p className="text-xs text-muted-foreground">Smart kost management</p>
            </div>
          </div>

          <p className="text-sm leading-7 text-muted-foreground">
            Satu dashboard owner untuk mengelola banyak kosan, banyak kamar, dan
            alur pembayaran tenant yang tetap ringkas lewat Telegram.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card/80 text-muted-foreground transition hover:border-cyan-300/50 hover:bg-card hover:text-foreground dark:hover:border-cyan-300/30"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              {group.title}
            </h3>
            <div className="space-y-3">
              {group.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 KosanPay. Landing page konsep untuk proyek skripsi manajemen
          kosan.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span>Audit trail siap ditinjau</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>Payment status lebih transparan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
