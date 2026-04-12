import { AppDownloadSection } from "@/components/landing/app-download-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";
import { SecuritySection } from "@/components/landing/security-section";

export default function Home() {
  return (
    <main className="landing-shell relative min-h-screen overflow-x-hidden bg-background">
      <div className="landing-grid absolute inset-0" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-12 pt-6 sm:gap-10 sm:px-6 lg:gap-12 lg:px-8">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <SecuritySection />
        <AppDownloadSection />
        <Footer />
      </div>
    </main>
  );
}
