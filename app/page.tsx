import { CTASection } from "@/components/landing/app-download-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection, LogosSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";
import { TestimonialsSection } from "@/components/landing/security-section";
import { TelegramBotSection } from "@/components/landing/telegram-bot-section";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <Navbar />
      <main className="grow">
        <HeroSection />
        <LogosSection />
        <FeaturesSection />
        <TelegramBotSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
