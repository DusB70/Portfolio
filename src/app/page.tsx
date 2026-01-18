/**
 * PREMIUM PORTFOLIO - Main Page
 *
 * Features:
 * - Full-screen snap scrolling (one section at a time)
 * - Keyboard navigation between sections
 * - Liquid/fluid entrance/exit transitions
 * - SVG filter-based morphing effects
 */

"use client";

import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import ProjectsSimple from "@/components/sections/ProjectsSimple";
import Contact from "@/components/sections/Contact";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import {
  LiquidFilter,
  LiquidSection,
  LiquidDivider,
} from "@/components/LiquidTransition";

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
