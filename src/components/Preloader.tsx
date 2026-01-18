"use client";

/**
 * Preloader - Elegant loading screen with name reveal
 *
 * Animation Sequence:
 * 1. Counter animates from 0-100
 * 2. Name reveals with mask animation
 * 3. Screen slides up with curve transition
 *
 * Inspired by high-end portfolio loading screens
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Eased progress - slower at start, faster at end
        const increment = Math.max(1, Math.floor((100 - prev) / 10));
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Wait a moment at 100% before transitioning
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (isComplete) {
      // Callback after exit animation
      const timeout = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  // Text to reveal
  const name = "Tharusha Pathirana";
  const words = name.split(" ");

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black whitespace-nowrap"
          exit={{
            y: "-100vh",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Curve overlay for exit */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[200px] bg-black"
            exit={{
              height: "100vh",
              borderRadius: "0 0 50% 50%",
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
          />

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Name reveal */}
            <div className="overflow-hidden mb-8">
              <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
              >
                {words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white tracking-tighter"
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        className="inline-block"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.3 + wordIndex * 0.1 + charIndex * 0.03,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Progress counter */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.9,
                }}
                className="flex items-baseline justify-center gap-1"
              >
                <span className="text-5xl md:text-7xl font-heading font-light text-white tabular-nums">
                  {progress}
                </span>
                <span className="text-2xl md:text-3xl font-heading font-light text-white/60">
                  %
                </span>
              </motion.div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-8 w-48 md:w-64 h-[1px] bg-white/20 mx-auto overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                className="h-full bg-white origin-left"
                style={{ scaleX: progress / 100 }}
                transition={{ ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Corner elements */}
          <motion.div
            className="absolute top-8 left-8 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Portfolio © {new Date().getFullYear()}
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Digital Experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
