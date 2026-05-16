import { Building2, Globe, MessageCircleMore } from "lucide-react";

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
    <footer className="border-t border-border pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_repeat(4,0.8fr)] lg:gap-8">
          {/* Brand column */}
          <div className="max-w-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Building2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-[15px] font-medium text-foreground">
                KosanPay
              </span>
            </div>

            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Satu dashboard owner untuk mengelola banyak kosan, banyak kamar,
              dan alur pembayaran tenant lewat Telegram.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href="#"
                    aria-label={item.label}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-[13px] text-muted-foreground">
            © 2026 KosanPay. Landing page konsep untuk proyek skripsi manajemen
            kosan.
          </p>
        </div>
      </div>
    </footer>
  );
}
