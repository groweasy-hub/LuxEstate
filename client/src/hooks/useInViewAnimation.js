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

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      el
        .querySelectorAll("[data-reveal], [data-stagger]")
        .forEach((node) => node.classList.add("is-visible"));
      return;
    }

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

    if (el.hasAttribute("data-reveal") || el.hasAttribute("data-stagger")) {
      observer.observe(el);
    }

    const children = el.querySelectorAll("[data-reveal], [data-stagger]");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return ref;
}

export default useInViewAnimation;
