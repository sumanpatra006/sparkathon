"use client";
import { useRouter } from "next/navigation";
import HomeHeader from "../components/HomeHeader";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import HomeFooter from "../components/HomeFooter";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <HomeHeader />
      <div className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
        <HomeFooter />
      </div>
    </main>
  );
}
