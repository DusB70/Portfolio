/**
 * PREMIUM PORTFOLIO - Main Page
 *
 * Features:
 * - Full-screen snap scrolling (one section at a time)
 * - Keyboard navigation between sections
 * - Liquid/fluid entrance/exit transitions
 * - SVG filter-based morphing effects
 * - Lazy loading for sections below the fold (mobile optimization)
 */

"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import {
  LiquidFilter,
  LiquidSection,
  LiquidDivider,
} from "@/components/LiquidTransition";

// Lazy load sections below the fold for better mobile performance
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <SectionSkeleton />,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  loading: () => <SectionSkeleton />,
});
const Education = dynamic(() => import("@/components/sections/Education"), {
  loading: () => <SectionSkeleton />,
});
const ProjectsSimple = dynamic(
  () => import("@/components/sections/ProjectsSimple"),
  {
    loading: () => <SectionSkeleton />,
  },
);
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <SectionSkeleton />,
});

// Minimal skeleton for lazy-loaded sections
function SectionSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  );
}

const sections = [
  { id: "hero", Component: Hero },
  { id: "about", Component: About },
  { id: "skills", Component: Skills },
  { id: "education", Component: Education },
  { id: "projects", Component: ProjectsSimple },
  { id: "contact", Component: Contact },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* SVG Filters for liquid effects */}
      <LiquidFilter />

      {/* Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Fixed Navigation */}
      <Header />

      {/* Cursor-following ambient light */}
      <CursorGlow />

      {/* Main Content */}
      <main ref={containerRef} className="relative bg-black">
        {sections.map((section, index) => {
          const SectionComponent = section.Component;

          return (
            <div key={section.id}>
              {/* Liquid divider between sections */}
              {index > 0 && <LiquidDivider />}

              {/* Section with liquid transition */}
              <LiquidSection id={section.id} index={index}>
                <SectionComponent />
              </LiquidSection>
            </div>
          );
        })}
      </main>
    </>
  );
}
