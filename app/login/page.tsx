import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Building2, CircleCheckBig, ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCurrentOwner } from "@/lib/auth";

const highlights = ["Banyak kosan", "Status pembayaran", "Tenant via Telegram"];

export default async function LoginPage() {
  const owner = await getCurrentOwner();

  if (owner) {
    redirect("/dashboard");
  }

  return (
    <main className="landing-shell relative min-h-screen overflow-x-hidden bg-background">
      <div className="landing-grid absolute inset-0" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <section className="rounded-[2rem] border border-border/70 bg-card/75 p-7 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:bg-card/30 sm:p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/10 dark:ring-white/10">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">KosanPay</p>
                    <p className="text-sm text-muted-foreground">Owner web access</p>
                  </div>
                </div>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali
                </Link>
              </div>

              <div className="space-y-4">
                <Badge>Secure owner login</Badge>
                <div className="space-y-3">
                  <h1 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Masuk ke dashboard owner.
                  </h1>
                  <p className="max-w-md text-base leading-7 text-muted-foreground">
                    Kelola kosan, kamar, dan pembayaran dari satu tempat.
                  </p>
                </div>
              </div>

              <Card className="border-border/70 bg-background/70 p-5 dark:bg-slate-950/50">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  Setelah login
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/70 px-3 py-3 text-sm text-muted-foreground dark:bg-background/30"
                    >
                      <CircleCheckBig className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <Card className="w-full max-w-xl border-border/70 bg-card/90 p-7 shadow-[0_35px_100px_-55px_rgba(14,165,233,0.30)] dark:bg-slate-950/65 sm:p-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">Login owner</p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Selamat datang kembali
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">Masukkan akun Anda.</p>
              </div>

              <LoginForm />

            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
