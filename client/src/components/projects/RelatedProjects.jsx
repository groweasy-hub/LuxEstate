"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RelatedCard from "./RelatedCard";

export default function RelatedProjects({ projects = [], currentId }) {
  const scrollRef = useRef(null);

  const filtered = projects.filter((p) => p.id !== currentId).slice(0, 8);

  if (!filtered.length) return null;

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div
        className="flex-between"
        style={{ marginBottom: "var(--space-6)", alignItems: "flex-end" }}
      >
        <div>
          <div
            className="section-label"
            style={{ marginBottom: "var(--space-2)" }}
          >
            <span>More Options</span>
          </div>
          <h3>Similar Properties</h3>
        </div>

        {/* Nav arrows */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => scroll(-1)}
            className="btn btn-icon glass"
            aria-label="Scroll left"
            whileHover={{ scale: 1.05, boxShadow: "var(--shadow-gold-sm)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button
            onClick={() => scroll(1)}
            className="btn btn-icon glass"
            aria-label="Scroll right"
            whileHover={{ scale: 1.05, boxShadow: "var(--shadow-gold-sm)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "var(--space-5)",
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingBottom: "var(--space-2)",
          cursor: "grab",
        }}
        onMouseDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          const startX = e.clientX;
          const startScroll = el.scrollLeft;
          el.style.cursor = "grabbing";
          const onMove = (ev) => {
            el.scrollLeft = startScroll - (ev.clientX - startX);
          };
          const onUp = () => {
            el.style.cursor = "grab";
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
          };
          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
        }}
      >
        {filtered.map((project, index) => (
          <RelatedCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Scroll hint fade */}
      <div
        style={{
          background:
            "linear-gradient(to left, var(--surface-base) 0%, transparent 100%)",
          position: "relative",
          height: 0,
          pointerEvents: "none",
        }}
      />
    </motion.section>
  );
}
