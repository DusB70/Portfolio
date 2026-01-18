"use client";

/**
 * Contact Section - Minimal layout with animated reveals
 *
 * Animation Logic:
 * - Scroll-triggered content reveals
 * - Email hover animation with sliding underline
 * - Social links with scale hover interactions
 * - Copy-to-clipboard with "Copied!" feedback
 */

import { motion } from "framer-motion";
import { useState } from "react";

// Social links with SVG icons (black and white)
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/DusB70",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tharusha-pathirana-632716249",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/+94754969504",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "thanushanga@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback to mailto if clipboard fails
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="relative py-[var(--section-padding)]">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mb-12 md:mb-16"
          >
            <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em]">
              06
            </span>
            <div className="w-12 h-[1px] bg-gray-700" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em]">
              Contact
            </span>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-4xl">
            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white leading-[0.9] mb-12 tracking-tighter"
            >
              Let&apos;s build the
              <br />
              <span className="text-gray-600">future</span> together.
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-16 leading-relaxed font-light"
            >
              Currently available for new opportunities. Whether you have a
              specific project in mind or just want to say hi, my inbox is
              always open.
            </motion.p>

            {/* Email - Click to Copy */}
            <motion.div variants={itemVariants} className="mb-20">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] block mb-6">
                Direct Contact
              </span>
              <button
                onClick={handleCopyEmail}
                className="group relative inline-block text-3xl md:text-6xl lg:text-7xl font-heading font-bold text-white hover:text-gray-300 transition-colors duration-300 text-left"
              >
                <span className="relative z-10">{email}</span>
                {/* Animated underline */}
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                {/* Copied feedback */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 10 }}
                  className="absolute -bottom-10 left-0 text-sm font-mono text-green-400 uppercase tracking-widest"
                >
                  ✓ Copied to clipboard
                </motion.span>
              </button>
              <p className="text-xs text-gray-600 mt-4 font-mono">
                Click to copy • or{" "}
                <a
                  href={`mailto:${email}`}
                  className="underline hover:text-gray-400 transition-colors"
                >
                  open in mail client
                </a>
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <span className="text-xs text-gray-500 uppercase tracking-wider block mb-6">
                Connect with me
              </span>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 text-white bg-transparent hover:bg-white/15 hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                    aria-label={link.name}
                  >
                    <span className="transition-colors duration-300">
                      {link.icon}
                    </span>
                    <span className="text-sm font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="mt-32 md:mt-48 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Tharusha Pathirana. All rights
                reserved.
              </div>
              <div className="text-sm text-gray-600">
                Built with Next.js, Tailwind CSS & Framer Motion
              </div>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
}
