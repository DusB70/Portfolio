"use client";

/**
 * About Section - Minimal content with animated dividers and profile picture
 *
 * Animation Logic:
 * - Desktop: Scroll-triggered parallax and staggered reveals
 * - Mobile: Simple fade-in animations for 60fps
 * - Low Power: Minimal animations
 */

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useDeviceOptimization } from "@/hooks/useDeviceOptimization";
import { useSafeScroll } from "@/hooks/useScrollUtils";

// Container variants for staggered children
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

// Mobile-optimized container (faster, lighter)
const mobileContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Text reveal variants
const textVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Mobile text variants (simpler)
const mobileTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// Divider line variants - expands from center
const dividerVariants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Image reveal variants
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Animated divider component
function AnimatedDivider() {
  return (
    <motion.div
      variants={dividerVariants}
      className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent origin-center"
    />
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile, animationLevel } = useDeviceOptimization();

  // Disable scroll tracking on mobile for performance
  const { scrollYProgress } = useSafeScroll(
    sectionRef,
    ["start end", "end start"],
    !isMobile
  );

  // Parallax effects - disabled on mobile
  const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["5%", "-5%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["10%", "-10%"]);

  // Select appropriate variants based on device
  const activeContainerVariants = animationLevel === "full" ? containerVariants : mobileContainerVariants;
  const activeTextVariants = animationLevel === "full" ? textVariants : mobileTextVariants;

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-12 md:py-16 lg:py-20"
    >
      {/* Parallax background accent - simplified on mobile */}
      <motion.div
        style={isMobile ? {} : { y: bgY }}
        className={`absolute top-1/2 right-0 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none ${
          isMobile
            ? "w-[200px] h-[200px] bg-gradient-radial from-white/[0.01] to-transparent"
            : "w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-radial from-white/[0.02] to-transparent blur-3xl"
        }`}
      />

      <div className="container max-w-6xl">
        <motion.div
          variants={activeContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 md:space-y-8 lg:space-y-10"
        >
          {/* Section Label */}
          <motion.div
            variants={activeTextVariants}
            className="flex items-center gap-3 md:gap-4"
          >
            <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">
              02
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-gray-700" />
            <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">
              About
            </span>
          </motion.div>

          {/* Top Divider */}
          <AnimatedDivider />

          {/* Main Content with Image */}
          <div className="grid md:grid-cols-14 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Profile Image - Left Side */}
            <motion.div
              variants={animationLevel === "full" ? imageVariants : mobileTextVariants}
              className="md:col-span-4 lg:col-span-5 order-1 md:order-1"
            >
              <motion.div
                style={isMobile ? {} : { y: imageY }}
                className="relative aspect-[3/4] max-w-[280px] md:max-w-none mx-auto"
              >
                {/* Decorative frame */}
                <div className="absolute -inset-2 md:-inset-4 border border-white/10 rounded-2xl" />
                <div className="absolute -inset-4 md:-inset-8 border border-white/5 rounded-3xl" />

                {/* Image container with glassmorphism - reduced blur on mobile */}
                <div className={`relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 ${isMobile ? "" : "backdrop-blur-sm"}`}>
                  <Image
                    src="/Profile.jpg"
                    alt="Tharusha Pathirana"
                    fill
                    sizes="(max-width: 768px) 280px, 400px"
                    className="object-cover"
                    priority={!isMobile}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating accent elements */}
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 md:w-24 h-16 md:h-24 border-t-2 border-r-2 border-white/20 rounded-tr-2xl" />
                <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 md:w-24 h-16 md:h-24 border-b-2 border-l-2 border-white/20 rounded-bl-2xl" />
              </motion.div>
            </motion.div>

            {/* Text Content - Right Side */}
            <div className="md:col-span-8 lg:col-span-7 order-2 md:order-2 space-y-6 md:space-y-8">
              {/* Heading */}
              <motion.div variants={activeTextVariants}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">
                  Crafting digital
                  <br />
                  <span className="text-gray-600">excellence.</span>
                </h2>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={activeTextVariants}
                className="space-y-4 md:space-y-6"
              >
                <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-light">
                  I&apos;m an ICT undergraduate at Rajarata University of Sri
                  Lanka with a strong interest in building practical software
                  solutions. I enjoy working with modern web technologies and
                  turning ideas into clean, usable products.
                </p>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                  Currently focused on improving my full-stack development
                  skills and building real projects that solve actual problems.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Divider */}
          <AnimatedDivider />

          {/* Stats/Quick Info */}
          <motion.div
            variants={activeContainerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-4 md:pt-6"
          >
            {[
              { label: "Year of Study", value: "3rd" },
              { label: "Projects Built", value: "10+" },
              { label: "Technologies", value: "15+" },
              { label: "Status", value: "Open" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={activeTextVariants}
                className="text-center md:text-left p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
