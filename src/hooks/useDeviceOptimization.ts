"use client";

/**
 * Device Optimization Hooks
 * 
 * Provides centralized detection for:
 * - Mobile/touch devices
 * - Low power mode (battery saver, reduced motion preference, slow CPU)
 * - Animation complexity levels
 */

import { useState, useEffect } from "react";

export type AnimationLevel = "full" | "reduced" | "minimal";

interface DeviceOptimization {
  isMobile: boolean;
  isLowPower: boolean;
  animationLevel: AnimationLevel;
  prefersReducedMotion: boolean;
}

// Singleton state to avoid multiple listeners
let cachedResult: DeviceOptimization | null = null;
let listeners: Set<() => void> = new Set();

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

function detectOptimization(): DeviceOptimization {
  if (typeof window === "undefined") {
    // SSR default - assume mobile/low power to prevent heavy hydration
    return {
      isMobile: true,
      isLowPower: true,
      animationLevel: "minimal",
      prefersReducedMotion: false,
    };
  }

  // Mobile detection
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth < 768;
  const isMobile = isTouchDevice || isSmallScreen;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Low power detection
  const isLowEndDevice = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
  const isSlowConnection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } })
    .connection?.effectiveType === "2g" || 
    (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection?.saveData === true;
  
  // Battery API (where available)
  let isLowBattery = false;
  if ("getBattery" in navigator) {
    // Note: This is async, we'll update later if needed
  }

  const isLowPower = prefersReducedMotion || isLowEndDevice || isSlowConnection || isLowBattery;

  // Determine animation level
  let animationLevel: AnimationLevel = "full";
  if (prefersReducedMotion) {
    animationLevel = "minimal";
  } else if (isMobile || isLowPower) {
    animationLevel = "reduced";
  }

  return {
    isMobile,
    isLowPower,
    animationLevel,
    prefersReducedMotion,
  };
}

/**
 * Hook to detect mobile devices
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true); // Default true for SSR

  useEffect(() => {
    const update = () => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
}

/**
 * Hook for comprehensive device optimization settings
 */
export function useDeviceOptimization(): DeviceOptimization {
  const [optimization, setOptimization] = useState<DeviceOptimization>(() => {
    if (cachedResult) return cachedResult;
    return detectOptimization();
  });

  useEffect(() => {
    // Initial detection
    cachedResult = detectOptimization();
    setOptimization(cachedResult);

    // Listen for changes
    const update = () => {
      cachedResult = detectOptimization();
      setOptimization(cachedResult);
      notifyListeners();
    };

    // Resize listener
    window.addEventListener("resize", update);

    // Reduced motion preference listener
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", update);

    // Battery API (async)
    if ("getBattery" in navigator) {
      (navigator as Navigator & { getBattery: () => Promise<{ charging: boolean; level: number; addEventListener: (e: string, fn: () => void) => void }> })
        .getBattery()
        .then((battery) => {
          const checkBattery = () => {
            if (battery.level < 0.2 && !battery.charging) {
              cachedResult = { ...detectOptimization(), isLowPower: true, animationLevel: "reduced" };
              setOptimization(cachedResult);
            }
          };
          checkBattery();
          battery.addEventListener("levelchange", checkBattery);
          battery.addEventListener("chargingchange", checkBattery);
        })
        .catch(() => {});
    }

    // Register this component's listener
    const listener = () => setOptimization(cachedResult!);
    listeners.add(listener);

    return () => {
      window.removeEventListener("resize", update);
      mediaQuery.removeEventListener("change", update);
      listeners.delete(listener);
    };
  }, []);

  return optimization;
}

/**
 * Hook to check if we should use simple animations
 */
export function useSimpleAnimations(): boolean {
  const { animationLevel } = useDeviceOptimization();
  return animationLevel !== "full";
}

/**
 * Get animation variants based on device capability
 */
export function getOptimizedVariants(
  fullVariants: Record<string, unknown>,
  reducedVariants: Record<string, unknown>,
  minimalVariants: Record<string, unknown>,
  level: AnimationLevel
): Record<string, unknown> {
  switch (level) {
    case "minimal":
      return minimalVariants;
    case "reduced":
      return reducedVariants;
    default:
      return fullVariants;
  }
}
