"use client";

/**
 * Header Component - Modern Floating Navigation with Mobile Menu
 *
 * Features:
 * - Glassmorphism design with gradient borders
 * - Magnetic hover effects on nav items
 * - Smooth morphing active indicator
 * - Mobile hamburger menu with slide-in navigation
 * - Premium gradient accents
 */

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useDeviceOptimization } from "@/hooks/useDeviceOptimization";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// Mobile menu animation variants - Premium slide-down with stagger
const menuVariants = {
  closed: {
    opacity: 0,
    y: -30,
    scale: 0.9,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.67, 0] as const,
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    y: -10,
    x: -10,
  },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useDeviceOptimization();

  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "skills",
      "education",
      "projects",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Small delay to allow menu to close
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        {/* White glow effect around navbar */}
        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full" />

        <nav
          className={`relative px-3 md:px-4 py-2.5 md:py-3 bg-black rounded-full border border-white/10 flex items-center justify-between ${isMobile ? "shadow-lg" : "backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.15),0_0_80px_rgba(255,255,255,0.08)]"}`}
        >
          {/* Logo Section */}
          <motion.div
            className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative group cursor-pointer">
              {/* White glow ring on hover */}
              <motion.div className="absolute -inset-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-500" />
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-black border border-white/20 overflow-hidden flex items-center justify-center shadow-lg">
                <span className="text-xs md:text-sm font-black text-white">
                  TP
                </span>
              </div>
            </div>
            <span className="text-sm md:text-base font-black tracking-tight text-white hidden sm:block">
              THARUSHA
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="relative hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.name}
                link={link}
                isActive={activeSection === link.href.substring(1)}
                isHovered={hoveredIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </div>

          {/* Desktop CTA Button */}
          <motion.a
            href="/resume.pdf"
            download
            className="relative group px-4 md:px-6 py-2 md:py-2.5 mr-1 bg-white rounded-full overflow-hidden hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated white/grey gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Button content */}
            <div className="relative flex items-center gap-2">
              <svg
                className="w-4 h-4 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                />
              </svg>
              <span className="text-sm font-bold uppercase tracking-wider text-black">
                Resume
              </span>
            </div>
          </motion.a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 mr-1"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-white rounded-full origin-left"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : 0,
                  width: isMobileMenuOpen ? "100%" : "100%",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-3/4 h-0.5 bg-white rounded-full"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  x: isMobileMenuOpen ? 20 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-0.5 bg-white rounded-full origin-left"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="bg-black/98 border border-white/10 rounded-2xl p-6 shadow-lg">
                {/* Mobile Nav Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      onClick={() => handleMobileNavClick(link.href)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                        activeSection === link.href.substring(1)
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {/* Bullet point arrow indicator */}
                      <svg
                        className={`w-3 h-3 transition-all duration-300 ${
                          activeSection === link.href.substring(1)
                            ? "text-white translate-x-1"
                            : "text-white/30"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {link.name}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Resume Button */}
                <motion.a
                  custom={navLinks.length}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  href="/resume.pdf"
                  download
                  className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-wider"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                    />
                  </svg>
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  link,
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  link: { name: string; href: string };
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  return (
    <motion.a
      ref={ref}
      href={link.href}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative z-10 px-3 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold transition-all duration-300 rounded-full ${
        isActive ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {link.name}

      {/* Active indicator - white shadow underneath */}
      {isActive && (
        <motion.div
          layoutId="activeSection"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_12px_rgba(255,255,255,0.4)]"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {/* Hover glow effect */}
      {isHovered && !isActive && (
        <motion.div
          layoutId="hoverGlow"
          className="absolute inset-0 bg-white/5 rounded-full -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.a>
  );
}
