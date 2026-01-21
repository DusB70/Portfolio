"use client";

/**
 * Projects Carousel - Clean 3D Angled Cards with Modal Details
 *
 * Features:
 * - Auto-sliding carousel with smooth transitions
 * - Cards show only project name
 * - Click to open modal with full details
 * - Modal includes snapshot carousel, description, tech stack, links
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";

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

// Snapshot Carousel Component - Only rendered when modal is open
function SnapshotCarousel({
  snapshots,
  title,
}: {
  snapshots: string[];
  title: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % snapshots.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + snapshots.length) % snapshots.length);
  };

  // Auto-slide snapshots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % snapshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [snapshots.length]);

  return (
    <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={snapshots[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {snapshots.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous snapshot"
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
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next snapshot"
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
        </>
      )}

      {/* Dots indicator */}
      {snapshots.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {snapshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Go to snapshot ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Project Detail Modal
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[70] bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col"
            onWheel={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-20"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="max-w-3xl mx-auto">
                {/* Project title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl md:text-2xl lg:text-10xl font-heading font-bold text-white mb-4"
                >
                  {project.title}
                </motion.h2>

                {/* Snapshot carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <SnapshotCarousel
                    snapshots={project.snapshots}
                    title={project.title}
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  <h3 className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">
                    Description
                  </h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4"
                >
                  <h3 className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-white/80 bg-white/10 border border-white/20 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View Source Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-white/90 rounded-lg text-black text-sm font-medium transition-all"
                  >
                    <svg
                      className="w-5 h-5"
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
                    Live Demo
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Mobile Project Cards Component with tap-to-open modal
function MobileProjectCards({
  projects,
  onOpenModal,
}: {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          onClick={() => onOpenModal(project)}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 cursor-pointer active:scale-[0.98] transition-transform"
          role="article"
          aria-label={`Project: ${project.title}`}
        >
          {/* Project Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Project number badge */}
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-[10px] font-mono text-white/80 uppercase tracking-wider">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Tap indicator */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-[10px] font-mono text-white/80 uppercase tracking-wider">
                Tap to view
              </span>
            </div>
          </div>

          {/* Title overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </motion.div>
      ))}

      {/* Hint text */}
      <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest py-2">
        Tap cards to view project details
      </p>
    </div>
  );
}

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
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

  // Auto-slide carousel
  useEffect(() => {
    if (isPaused || isModalOpen || isMobile) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused, isModalOpen, isMobile, totalProjects]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isModalOpen]);

  // Mouse wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (isModalOpen) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30) goToNext();
      if (e.deltaX < -30) goToPrev();
    } else {
      if (e.deltaY > 30) goToNext();
      if (e.deltaY < -30) goToPrev();
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Dispatch event to hide navbar
    window.dispatchEvent(
      new CustomEvent("projectModalStateChange", { detail: { isOpen: true } }),
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Dispatch event to show navbar
    window.dispatchEvent(
      new CustomEvent("projectModalStateChange", { detail: { isOpen: false } }),
    );
    // Clear selected project after animation completes to free up resources
    setTimeout(() => setSelectedProject(null), 400);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      // Open modal for active card
      openModal(projects[index]);
    } else {
      // Navigate to clicked card
      setActiveIndex(index);
    }
  };

  const getCardStyle = (index: number) => {
    // Calculate the shortest distance for infinite loop
    let diff = index - activeIndex;

    // Handle wrapping for infinite carousel
    if (diff > totalProjects / 2) diff -= totalProjects;
    if (diff < -totalProjects / 2) diff += totalProjects;

    const absDiff = Math.abs(diff);

    // Calculate position offset
    const xOffset = diff * 200;

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
    <>
      <div
        className={`relative flex flex-col pt-24 pb-8 ${isMobile ? "min-h-screen overflow-visible" : "h-screen overflow-hidden"}`}
        onWheel={!isMobile ? handleWheel : undefined}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Section header */}
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
            Experimental prototypes and high-performance production
            applications.
          </p>
        </motion.div>

        {/* Mobile: All Project Cards displayed one by one */}
        {isMobile ? (
          <MobileProjectCards projects={projects} onOpenModal={openModal} />
        ) : (
          /* Desktop: 3D Carousel */
          <div className="flex-1 flex flex-col justify-center min-h-0">
            {/* Carousel container */}
            <div
              className="relative flex-1 max-h-[50vh] min-h-[240px] flex items-center justify-center perspective-1500"
              role="region"
              aria-label="Project carousel"
              aria-roledescription="carousel"
            >
              {projects.map((project, index) => {
                const style = getCardStyle(index);
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={project.id}
                    className="absolute w-[200px] md:w-[240px] lg:w-[280px] aspect-[3/4] max-h-[calc(50vh-20px)] cursor-pointer"
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
                    onClick={() => handleCardClick(index)}
                    onMouseEnter={() => setHoveredCardIndex(index)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                    whileHover={isActive ? { scale: 1.02 } : {}}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${totalProjects}: ${project.title}`}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl shadow-black/50 group">
                      {/* Project image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-all duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

                        {/* Project number */}
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
                          <span className="text-[10px] font-mono text-white/80 uppercase tracking-wider">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Click indicator for active card - only on hover */}
                        <AnimatePresence>
                          {isActive && hoveredCardIndex === index && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20"
                            >
                              <span className="text-[10px] font-mono text-white/80 uppercase tracking-wider">
                                Click to view
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Project title at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-base md:text-lg lg:text-xl font-bold text-white leading-tight text-center">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation controls */}
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
                Click card to view details • Auto-sliding
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
