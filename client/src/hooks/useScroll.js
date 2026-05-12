"use client";
import { useState, useEffect } from "react";

/**
 * useScroll - tracks whether the page has scrolled past a threshold
 * @param {number} threshold - px before "scrolled" becomes true (default: 60)
 */
export function useScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setScrolled(y > threshold);
      setDirection(y > lastY ? "down" : "up");
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrolled, scrollY, direction };
}
