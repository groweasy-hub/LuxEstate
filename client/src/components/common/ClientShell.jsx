'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';

function useScrollReveal(enabled = true) {
  const observerRef = useRef(null);
  const mutationObserverRef = useRef(null);

  const revealAll = () => {
    document
      .querySelectorAll('[data-reveal], [data-stagger]')
      .forEach((el) => el.classList.add('is-visible'));
  };

  const attach = () => {
    if (!enabled) return;

    if (observerRef.current) observerRef.current.disconnect();

    const els = document.querySelectorAll('[data-reveal], [data-stagger]');
    if (!els.length) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observerRef.current.observe(el);
      }
    });
  };

  useEffect(() => {
    if (!enabled) {
      observerRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
      return undefined;
    }

    const paintTimer = setTimeout(attach, 80);
    const fallbackTimer = setTimeout(revealAll, 1800);

    if (typeof window !== 'undefined' && 'MutationObserver' in window) {
      mutationObserverRef.current?.disconnect();
      mutationObserverRef.current = new MutationObserver(() => {
        window.requestAnimationFrame(attach);
      });

      mutationObserverRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(paintTimer);
      clearTimeout(fallbackTimer);
      observerRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
    };
  }, [enabled]);
}

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  useScrollReveal(!isAdminRoute);

  useEffect(() => {
    if (isAdminRoute) return undefined;

    let lenis;
    let rafId;
    let cancelled = false;

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }).catch(() => {});

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy?.();
    };
  }, [isAdminRoute]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      {!isAdminRoute && <Navigation />}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingWhatsApp />}
    </>
  );
}
