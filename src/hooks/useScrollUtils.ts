"use client";

/**
 * Shared Scroll Utilities
 * 
 * Safe scroll hooks that prevent hydration mismatches
 * and can be completely disabled on mobile for performance
 */

import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";

// Type for scroll offset to satisfy framer-motion's strict typing
type ScrollOffsetValue = "start" | "end" | "center";
type ScrollOffsetPoint = `${ScrollOffsetValue} ${ScrollOffsetValue}`;
type ScrollOffset = [ScrollOffsetPoint, ScrollOffsetPoint];

/**
 * Hook to safely use scroll with refs (prevents hydration mismatch)
 * Can be completely disabled on mobile to prevent any scroll tracking overhead
 */
export function useSafeScroll(
  ref: React.RefObject<HTMLDivElement | null>,
  offset: ScrollOffset = ["start end", "end start"],
  enabled: boolean = true
) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted && enabled ? ref : undefined,
    offset,
  });

  return { scrollYProgress, isMounted, enabled: isMounted && enabled };
}
