"use client";
import { useEffect, useRef } from "react";

/**
 * useInViewAnimation
 * Attaches an IntersectionObserver to the returned ref.
 * Any child element with `data-reveal` gets the `.is-visible` class
 * when it enters the viewport, triggering CSS reveal animations.
 *
 * Usage:
 *   const ref = useInViewAnimation();
 *   <section ref={ref} data-reveal>…</section>
 *
 * In your globals.css:
 *   [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
 *   [data-reveal].is-visible { opacity: 1; transform: none; }
 */
export function useInViewAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      threshold = 0.15,
      rootMargin = "0px 0px -60px 0px",
      once = true,
    } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin },
    );

    // Observe the root element itself if it has data-reveal
    if (el.hasAttribute("data-reveal")) observer.observe(el);

    // Also observe all nested data-reveal children
    const children = el.querySelectorAll("[data-reveal]");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return ref;
}

export default useInViewAnimation;
