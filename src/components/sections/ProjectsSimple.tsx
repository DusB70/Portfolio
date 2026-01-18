"use client";

/**
 * Projects Carousel - Clean 3D Angled Cards
 *
 * Features:
 * - Horizontal scroll & arrow key navigation
 * - Focused card larger, side cards angled
 * - Hover reveals description, tech stack, links
 * - 5 project cards with provided images
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Detect if device is mobile/touch
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce with real-time inventory, payment processing, and analytics dashboard.",
    image: "/1.jpeg",
    technologies: ["Next.js", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "AI Content Generator",
    description:
      "AI-powered content generation with GPT-4 API and brand voice customization.",
    image: "/2.webp",
    technologies: ["Python", "OpenAI", "FastAPI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Collaboration Tool",
    description:
      "Real-time collaborative workspace with video calls and project management.",
    image: "/3.jpg",
    technologies: ["WebRTC", "Socket.io", "React"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description:
      "Interactive data visualization platform with real-time metrics and reporting.",
    image: "/1.jpeg",
    technologies: ["React", "D3.js", "Node.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 5,
    title: "Mobile Banking App",
    description:
      "Secure mobile banking with biometric auth and instant transfers.",
    image: "/2.webp",
    technologies: ["React Native", "Firebase", "Plaid"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

// Mobile Project Cards Component with tap-to-reveal
function MobileProjectCards({ projects }: { projects: Project[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-5 px-4 pb-8">
      {projects.map((project, index) => {
        const isExpanded = expandedId === project.id;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 md:backdrop-blur-sm"
            role="article"
            aria-label={`Project: ${project.title}`}
          >
            {/* Tap area with image and title */}
            <motion.div
              onClick={() => toggleExpand(project.id)}
              className="relative cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              {/* Project Image - taller aspect ratio */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-all duration-500 ${
                    isExpanded ? "scale-105 brightness-50" : ""
                  }`}
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Project number badge */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/10 md:backdrop-blur-sm border border-white/20">
                  <span className="text-[10px] font-mono text-white/80 uppercase tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Expand indicator */}
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 md:backdrop-blur-sm border border-white/20 flex items-center justify-center"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Title overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-white/50 text-xs mt-1">
                  {project.technologies.join(" • ")}
                </p>
              </div>
            </motion.div>

            {/* Expandable content area */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-2 border-t border-white/10">
                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs text-white/70 bg-white/5 border border-white/10 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-white/5 border border-white/20 rounded-xl text-white active:bg-white/10 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Code
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-white text-black font-medium rounded-xl active:bg-white/90 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Hint text */}
      <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest py-2">
        Tap cards to view details
      </p>
    </div>
  );
}

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isThrottled, setIsThrottled] = useState(false);
  const totalProjects = projects.length;
  const isMobile = useIsMobile();

  const goToNext = useCallback(() => {
    if (isThrottled) return;
    setIsThrottled(true);
    setActiveIndex((prev) => (prev + 1) % totalProjects);
    setTimeout(() => setIsThrottled(false), 300);
  }, [isThrottled, totalProjects]);

  const goToPrev = useCallback(() => {
    if (isThrottled) return;
    setIsThrottled(true);
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    setTimeout(() => setIsThrottled(false), 300);
  }, [isThrottled, totalProjects]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Mouse wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30) goToNext();
      if (e.deltaX < -30) goToPrev();
    } else {
      if (e.deltaY > 30) goToNext();
      if (e.deltaY < -30) goToPrev();
    }
  };

  const getCardStyle = (index: number) => {
    // Calculate the shortest distance for infinite loop
    let diff = index - activeIndex;

    // Handle wrapping for infinite carousel
    if (diff > totalProjects / 2) diff -= totalProjects;
    if (diff < -totalProjects / 2) diff += totalProjects;

    const absDiff = Math.abs(diff);

    // Calculate position offset - reduced for viewport-friendly spacing
    const xOffset = diff * 180;

    // Calculate rotation (angled cards)
    const rotateY = diff * -15;

    // Calculate scale - focused card is bigger
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.75 : 0.6;

    // Calculate z-index
    const zIndex = 10 - absDiff;

    // Calculate opacity - show 2 cards on each side
    const opacity = absDiff <= 2 ? 1 - absDiff * 0.3 : 0;

    return {
      x: xOffset,
      rotateY,
      scale,
      zIndex,
      opacity,
      absDiff,
    };
  };

  return (
    <div
      className={`relative flex flex-col pt-24 pb-8 ${isMobile ? "min-h-screen overflow-visible" : "h-screen overflow-hidden"}`}
      onWheel={!isMobile ? handleWheel : undefined}
    >
      {/* Section header - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 px-6 flex-shrink-0"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">
            05
          </span>
          <div className="w-8 h-[1px] bg-gray-700" />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">
            Projects
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-3 tracking-tight">
          Selected Works
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide max-w-xl mx-auto">
          Experimental prototypes and high-performance production applications.
        </p>
      </motion.div>

      {/* Mobile: All Project Cards displayed one by one */}
      {isMobile ? (
        <MobileProjectCards projects={projects} />
      ) : (
        /* Desktop: 3D Carousel */
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {/* Carousel container - dynamic height */}
          <div
            className="relative flex-1 max-h-[50vh] min-h-[240px] flex items-center justify-center perspective-1500"
            role="region"
            aria-label="Project carousel"
            aria-roledescription="carousel"
          >
            {projects.map((project, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;
              const isHovered = hoveredIndex === index && isActive;

              return (
                <motion.div
                  key={project.id}
                  className="absolute w-[180px] md:w-[220px] lg:w-[260px] aspect-[3/4] max-h-[calc(50vh-20px)] cursor-pointer"
                  style={{
                    zIndex: style.zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    x: style.x,
                    rotateY: style.rotateY,
                    scale: style.scale,
                    opacity: style.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${totalProjects}: ${
                    project.title
                  }`}
                  tabIndex={isActive ? 0 : -1}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl shadow-black/50">
                    {/* Project image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className={`object-cover transition-all duration-500 ${
                          isHovered ? "scale-110 brightness-[0.3]" : ""
                        }`}
                        loading="lazy"
                      />

                      {/* Default dark overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${
                          isHovered ? "opacity-0" : "opacity-100"
                        }`}
                      />

                      {/* Project title (always visible at bottom when not hovered) */}
                      {!isHovered && (
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-white/50 text-xs mt-1 line-clamp-1">
                            {project.technologies.join(" • ")}
                          </p>
                        </div>
                      )}

                      {/* Hover overlay with full details */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm p-4 flex flex-col"
                          >
                            {/* Title at top */}
                            <div className="mb-auto">
                              <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                                {project.title}
                              </h3>
                              <p className="text-white/70 text-xs md:text-sm leading-relaxed line-clamp-3">
                                {project.description}
                              </p>
                            </div>

                            {/* Technologies in middle */}
                            <div className="flex flex-wrap gap-1.5 my-3">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 text-[10px] text-white/80 bg-white/10 rounded-full border border-white/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Links at bottom */}
                            <div className="flex gap-2 mt-auto">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors text-xs"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span className="text-white font-medium">
                                  Code
                                </span>
                              </a>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-white/90 rounded-lg transition-colors text-xs"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-black"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span className="text-black font-medium">
                                  Demo
                                </span>
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation controls - compact */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3 mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={goToPrev}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots indicator inline */}
              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Project slides"
              >
                {projects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Go to project ${index + 1}: ${project.title}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                aria-label="Next project"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="text-[10px] text-gray-600 uppercase tracking-widest">
              {isMobile ? "Swipe or tap" : "Arrow keys or scroll"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
