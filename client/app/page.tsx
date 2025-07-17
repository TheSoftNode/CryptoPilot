"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Layout/Header";
import { HeroSection } from "@/components/Home/HeroSection";
import { FeaturesSection } from "@/components/Home/FeaturesSection";
import { WorkflowSection } from "@/components/Home/WorkflowSection";
import { Footer } from "@/components/Layout/Footer";
import { TestimonialsSection } from "@/components/Home/TestimonialsSection";
import { CtaSection } from "@/components/Home/CtaSection";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AnimatePresence>
          <HeroSection />
          <FeaturesSection />
          <WorkflowSection />
          <TestimonialsSection />
          <CtaSection />
        </AnimatePresence>
      </main>
    </div>
  );
}