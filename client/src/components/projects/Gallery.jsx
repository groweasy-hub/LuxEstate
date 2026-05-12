"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function Gallery({ imgs = [], title = "Gallery" }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const activeImg = imgs[active] || "/images/project-1.jpg";

  if (!imgs.length) return null;

  const prev = () => setActive((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setActive((i) => (i + 1) % imgs.length);
  const lbPrev = (e) => {
    e.stopPropagation();
    setLightbox((i) => (i - 1 + imgs.length) % imgs.length);
  };
  const lbNext = (e) => {
    e.stopPropagation();
    setLightbox((i) => (i + 1) % imgs.length);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: imgs.length > 1 ? "1fr 280px" : "1fr",
          gap: "var(--space-3)",
          height: 480,
        }}
        className="gallery-layout"
      >
        {/* Main image */}
        <div
          className="group"
          style={{
            position: "relative",
            borderRadius: "var(--radius-xl)",
            background: "var(--surface-elevated)",
            cursor: "zoom-in",
            overflow: "hidden",
          }}
          onClick={() => setLightbox(active)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={activeImg}
              alt={`${title} ${active + 1}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex-center opacity-0 group-hover:opacity-100"
            style={{
              background: "rgba(8,8,8,0.35)",
              transition: "opacity var(--transition-slow)",
            }}
          >
            <ZoomIn size={32} color="#fff" />
          </div>

          {/* Arrows */}
          {imgs.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-icon glass opacity-0 group-hover:opacity-100"
                style={{ transition: "opacity var(--transition-normal)" }}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-icon glass opacity-0 group-hover:opacity-100"
                style={{ transition: "opacity var(--transition-normal)" }}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Counter */}
          <span
            className="absolute bottom-3 right-3 badge glass"
            style={{ fontSize: "var(--text-xs)", color: "var(--text-primary)" }}
          >
            {active + 1} / {imgs.length}
          </span>
        </div>

        {/* Thumbnail strip */}
        {imgs.length > 1 && (
          <div
            className="gallery-thumbs flex flex-col gap-2 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {imgs.map((img, i) => (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                className="relative overflow-hidden flex-shrink-0"
                style={{
                  height: 88,
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  border: `2px solid ${i === active ? "var(--color-gold)" : "var(--border-subtle)"}`,
                  background: "var(--surface-elevated)",
                  transition: "border-color var(--transition-fast)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <img
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: i === active ? 1 : 0.5,
                  transition: "opacity var(--transition-fast)",
                  display: "block",
                  objectFit: "cover",
                }}
                src={img || "/images/project-1.jpg"}
                alt={`${title} thumbnail ${i + 1}`}
              />
            </motion.div>
          ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 flex-center"
            style={{ zIndex: "var(--z-modal)", background: "rgba(0,0,0,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative"
              style={{ maxWidth: "90vw", maxHeight: "85vh", width: "100%" }}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "100%",
                  height: "75vh",
                  borderRadius: "var(--radius-xl)",
                  background: "var(--surface-elevated)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imgs[lightbox] || "/images/project-1.jpg"}
                  alt={`${title} full view ${lightbox + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 btn btn-icon glass"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              {imgs.length > 1 && (
                <>
                  <button
                    onClick={lbPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-icon glass"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={lbNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-icon glass"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              <div
                className="text-center mt-3"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {lightbox + 1} / {imgs.length} — {title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .gallery-layout { grid-template-columns: 1fr !important; height: auto !important; }
          .gallery-thumbs { flex-direction: row !important; overflow-x: auto !important; overflow-y: hidden !important; }
          .gallery-thumbs > div { width: 80px !important; height: 60px !important; flex-shrink: 0; }
        }
      `}</style>
    </>
  );
}
