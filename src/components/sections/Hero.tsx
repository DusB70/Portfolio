"use client";

/**
 * Hero Section - Full viewport with animated text reveals
 *
 * Animation Logic:
 * - Letter-by-letter reveal for name using staggered children
 * - Line-by-line reveal for tagline with delay
 * - Subtle scale and fade entrance for supporting elements
 * - Uses spring physics for natural motion
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Container variants for orchestrating child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 2.0, // Adjusted for preloader timing
    },
  },
};

// Individual letter animation
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

// Tagline variants
const taglineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 2.5, // Adjusted for preloader
    },
  },
};

// Scroll indicator variants
const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 3.0, // Adjusted for preloader
    },
  },
};

// Animated split text component - now handles each word separately
function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={letterVariants}
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <motion.span
              variants={letterVariants}
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {"\u00A0"}
            </motion.span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for hero content
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = new Date();
      // Get current hour in Sri Lanka timezone
      const colomboTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Colombo" }));
      const hour = colomboTime.getHours();
      
      // Set availability: unavailable between 2 AM and 10 AM
      setIsAvailable(!(hour >= 2 && hour < 10));
      
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Colombo",
        })
      );
    };
    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 py-[var(--section-padding)]"
    >
      {/* Background gradient accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/[0.03] to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Main content with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6"
      >
        {/* Name - Main headline */}
        <h1 className="font-heading font-bold text-white mb-6 md:mb-10">
          <AnimatedText
            text="Tharusha Pathirana"
            className="text-[clamp(3.5rem,11vw,8rem)] leading-[0.85]"
          />
        </h1>

        {/* Tagline */}
        <motion.p
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-2xl lg:text-3xl text-gray-400 font-light tracking-[0.2em] uppercase max-w-4xl mx-auto"
        >
          ICT Undergraduate · Aspiring Software Developer
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 2.8,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="text-base md:text-lg text-gray-500 mt-8 md:mt-12 max-w-2xl mx-auto leading-relaxed"
        >
          I build clean, functional, and modern web experiences with a strong
          focus on real-world problem solving.
        </motion.p>
      </motion.div>

      {/* Corner decorative elements - Updated with Live Status - Now visible on all devices */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute top-20 right-4 md:top-24 md:right-12 text-right"
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="space-y-0.5 md:space-y-1">
            <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              Local Time
            </span>
            <p className="font-mono text-xs md:text-sm text-white">{time} Colombo, LK</p>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                Status
              </span>
              <span className={`text-[10px] md:text-[11px] uppercase tracking-tighter font-medium ${
                isAvailable ? "text-white/90" : "text-white/60"
              }`}>
                {isAvailable ? "Available for work" : "Currently offline"}
              </span>
            </div>
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
              {isAvailable ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-full w-full bg-gray-500"></span>
              )}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Improved Scroll Indicator - Animated Mouse Icon */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Mouse outline with scrolling dot */}
          <div className="relative w-6 h-10 rounded-full border-2 border-white/40 flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
            Scroll
          </span>
        </div>
      </motion.div>
    </div>
  );
}
