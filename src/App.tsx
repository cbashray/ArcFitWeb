import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import { LeaderboardSection, NutritionSection, ProgressSection } from "./components/Spotlights";
import Comparison from "./components/Comparison";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-onyx-900 text-iron-50 antialiased">
      {/* global ambient backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-[#0f1115]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(0,230,118,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_100%_50%,rgba(0,102,255,0.05),transparent_60%)]" />
      </div>

      <a
        href="#features"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-neon-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-onyx-950"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Metrics />
        <Features />
        <Showcase />
        <NutritionSection />
        <LeaderboardSection />
        <ProgressSection />
        <Comparison />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
