/**
 * LIQUID TRANSITION - Premium Section Transitions
 *
 * Creates a fluid, morphing blob effect between sections
 * Uses SVG filters for the liquid/gooey effect
 */

"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// SVG Filter for the liquid/gooey effect
export function LiquidFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Gooey/Liquid filter */}
        <filter id="liquid-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Morphing blob filter */}
        <filter id="morph-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            result="noise"
            seed="0"
          >
            <animate
              attributeName="seed"
              from="0"
              to="100"
              dur="10s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Smooth liquid distortion */}
        <filter
          id="liquid-distort"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="2"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02;0.04;0.02"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
}

// Liquid blob that appears between sections
interface LiquidBlobProps {
  progress: number; // 0 to 1 scroll progress
  direction: "up" | "down";
}

export function LiquidBlob({ progress, direction }: LiquidBlobProps) {
  const yOffset = direction === "down" ? -100 : 100;
  const opacity = Math.sin(progress * Math.PI); // Fade in then out

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
      style={{ opacity }}
    >
      {/* Main liquid blob */}
      <motion.div
        className="absolute w-[200vw] h-[60vh] left-1/2 bg-gradient-to-b from-white/5 via-white/10 to-transparent"
        style={{
          y: `calc(${progress * 100}% + ${yOffset}px)`,
          x: "-50%",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          filter: "url(#liquid-distort)",
        }}
        animate={{
          borderRadius: [
            "50% 50% 50% 50% / 60% 60% 40% 40%",
            "60% 40% 40% 60% / 50% 50% 50% 50%",
            "50% 50% 50% 50% / 60% 60% 40% 40%",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Section divider with liquid effect
interface LiquidDividerProps {
  className?: string;
}

export function LiquidDivider({ className = "" }: LiquidDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const waveOffset = useTransform(smoothProgress, [0, 1], [0, 100]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={`relative h-32 w-full overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* Animated wave SVG */}
      <motion.svg
        className="absolute w-[200%] h-full left-0"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ x: waveOffset }}
      >
        <motion.path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill="url(#wave-gradient)"
          animate={{
            d: [
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              "M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60 L1440,120 L0,120 Z",
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}

// Liquid transition overlay for section changes
interface LiquidOverlayProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function LiquidOverlay({ isActive, onComplete }: LiquidOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Multiple liquid blobs for complex effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full"
          initial={{ y: "100%" }}
          animate={{
            y: isActive ? ["100%", "0%", "-100%"] : "100%",
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.1,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-b from-black via-gray-900 to-black"
            style={{
              filter: "url(#liquid-filter)",
              borderRadius: "0 0 50% 50% / 0 0 20% 20%",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Section wrapper with liquid entrance animation
interface LiquidSectionProps {
  children: React.ReactNode;
  id: string;
  index: number;
}

export function LiquidSection({ children, id, index }: LiquidSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  // Transform values based on scroll
  const y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95]
  );

  // Liquid distortion amount
  const distortion = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [20, 0, 0, 20]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsInView(latest > 0.1 && latest < 0.9);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        opacity,
        scale,
      }}
    >
      {/* Liquid edge effect at top */}
      {index > 0 && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
            filter: isInView ? "url(#liquid-distort)" : "none",
          }}
        />
      )}

      {/* Main content with liquid animation */}
      <motion.div className="w-full relative z-10 pt-16" style={{ y }}>
        {children}
      </motion.div>

      {/* Liquid edge effect at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          filter: isInView ? "url(#liquid-distort)" : "none",
        }}
      />

      {/* Floating liquid particles */}
      <LiquidParticles isActive={isInView} />
    </motion.section>
  );
}

// Floating liquid particles for ambient effect
function LiquidParticles({ isActive }: { isActive: boolean }) {
  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: 100 + Math.random() * 200,
    x: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/[0.02]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            filter: "url(#liquid-filter) blur(40px)",
          }}
          initial={{ y: "120%", opacity: 0 }}
          animate={
            isActive
              ? {
                  y: ["-20%", "-120%"],
                  opacity: [0, 0.5, 0],
                }
              : { y: "120%", opacity: 0 }
          }
          transition={{
            duration: 8 + particle.delay * 2,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default LiquidSection;
