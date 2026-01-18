"use client";

/**
 * Education Section - Timeline-style education display
 *
 * Animation Logic:
 * - Desktop: Scroll-triggered parallax and staggered reveals
 * - Mobile: Simple fade-in for 60fps performance
 */

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useDeviceOptimization } from "@/hooks/useDeviceOptimization";
import { useSafeScroll } from "@/hooks/useScrollUtils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Education data
const education = [
  {
    degree: "Bachelor in Information and Communication Technology (ICT)",
    institution: "Rajarata University of Sri Lanka",
    status: "Undergraduate",
    year: "3rd Year",
    period: "2023 - Present",
    description:
      "Pursuing a comprehensive degree in ICT with focus on software development, web technologies, and system design.",
    highlights: [
      "Focus on Web Development",
      "Database Management",
      "Software Engineering",
      "Computer Networks",
    ],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceOptimization();

  // Disable scroll tracking on mobile
  const { scrollYProgress } = useSafeScroll(
    sectionRef,
    ["start end", "end start"],
    !isMobile
  );

  // Parallax effects - disabled on mobile
  const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["15%", "-15%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Parallax background accent - simplified on mobile */}
      <motion.div
        style={isMobile ? {} : { y: bgY }}
        className={`absolute top-1/4 right-0 rounded-full translate-x-1/3 pointer-events-none ${
          isMobile
            ? "w-[150px] h-[150px] bg-gradient-radial from-purple-500/[0.02] to-transparent"
            : "w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-radial from-purple-500/[0.03] to-transparent blur-3xl"
        }`}
      />
      <motion.div
        style={isMobile ? {} : { y: bgY }}
        className={`absolute bottom-1/4 left-0 rounded-full -translate-x-1/2 pointer-events-none ${
          isMobile
            ? "w-[100px] h-[100px] bg-gradient-radial from-blue-500/[0.01] to-transparent"
            : "w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gradient-radial from-blue-500/[0.02] to-transparent blur-3xl"
        }`}
      />

      <div className="container relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="mb-10 md:mb-16"
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">
              04
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-gray-700" />
            <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">
              Education
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight">
            Academic Journey
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-gray-400 mt-3 md:mt-6 max-w-2xl leading-relaxed">
            Building a strong foundation in technology and software development.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />

          {/* Animated progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-8 top-0 w-[1px] bg-gradient-to-b from-white via-white/50 to-transparent hidden md:block"
          />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-0 md:pl-20 mb-8 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-6 top-8 w-4 h-4 rounded-full border-2 border-white bg-black hidden md:flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>

              {/* Education Card - no backdrop-blur on mobile */}
              <div className="group relative p-6 md:p-8 lg:p-10 rounded-2xl border border-white/10 bg-white/[0.02] md:backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] overflow-hidden">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent pointer-events-none" />

                {/* Status Badge */}
                <div className="relative z-10 flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <span className="px-3 py-1 text-[10px] md:text-xs font-mono text-white/80 bg-white/10 border border-white/20 rounded-full uppercase tracking-wider">
                    {edu.status}
                  </span>
                  <span className="px-3 py-1 text-[10px] md:text-xs font-mono text-green-400 bg-green-500/10 border border-green-500/20 rounded-full uppercase tracking-wider">
                    {edu.year}
                  </span>
                  <span className="text-[10px] md:text-xs font-mono text-gray-500 ml-auto">
                    {edu.period}
                  </span>
                </div>

                {/* Degree Title */}
                <h3 className="relative z-10 text-lg md:text-xl lg:text-2xl font-heading font-semibold text-white mb-2 md:mb-3 group-hover:text-gradient transition-all duration-300">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <div className="relative z-10 flex items-center gap-2 mb-4 md:mb-6">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  <span className="text-sm md:text-base text-gray-400 font-medium">
                    {edu.institution}
                  </span>
                </div>

                {/* Description */}
                <p className="relative z-10 text-sm md:text-base text-gray-500 leading-relaxed mb-4 md:mb-6 max-w-2xl">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="relative z-10 flex flex-wrap gap-2 md:gap-3">
                  {edu.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-[10px] md:text-xs text-gray-400 bg-white/[0.03] border border-white/5 rounded-lg hover:border-white/20 hover:text-white transition-all duration-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 md:w-12 h-8 md:h-12 border-t border-r border-white/10 group-hover:border-white/30 transition-colors duration-500 rounded-tr-xl" />
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-8 md:w-12 h-8 md:h-12 border-b border-l border-white/10 group-hover:border-white/30 transition-colors duration-500 rounded-bl-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
