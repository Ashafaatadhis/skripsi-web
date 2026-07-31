import { Building2, Globe, MessageCircleMore } from "lucide-react";

const footerGroups = [
  {
    title: "Layanan",
    links: [
      "Cek Ketersediaan Kamar",
      "Status Sewa Saya",
      "Riwayat Pembayaran",
      "Chat via Telegram",
    ],
  },
  {
    title: "Fasilitas",
    links: ["WiFi Cepat", "Kamar Mandi Dalam", "Parkir & Keamanan 24 Jam"],
  },
  {
    title: "Bantuan",
    links: ["Panduan Penyewa", "Cara Bayar Sewa", "FAQ", "Hubungi Admin"],
  },
  {
    title: "Legal",
    links: ["Kebijakan Privasi", "Syarat Penggunaan", "Keamanan Data"],
  },
];

const socialLinks = [
  { label: "Telegram", icon: MessageCircleMore },
  { label: "Website", icon: Globe },
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
                Kost Tofu
              </span>
            </div>

            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Hunian kos modern di Depok dengan fasilitas lengkap. Kelola sewa
              dan bayar langsung dari Telegram.
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
            © 2026 Kost Tofu. Hunian kos modern di Depok.
          </p>
        </div>
      </div>
    </footer>
  );
}
