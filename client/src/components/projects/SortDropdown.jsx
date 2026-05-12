"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, ArrowUpDown } from "lucide-react";

export default function SortDropdown({ sort, setSort, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === sort);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", minWidth: 200 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost btn-sm flex items-center"
        style={{
          gap: "var(--space-2)",
          width: "100%",
          justifyContent: "space-between",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <ArrowUpDown size={13} color="var(--text-muted)" />
          <span style={{ color: "var(--text-muted)" }}>Sort:</span>
          <span style={{ color: "var(--text-primary)" }}>
            {selected?.label}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={14} color="var(--text-muted)" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass"
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: 230,
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)",
              zIndex: "var(--z-dropdown)",
              border: "1px solid var(--border-subtle)",
            }}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {options.map((opt, i) => {
              const isSelected = sort === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSort(opt.value);
                    setOpen(false);
                  }}
                  className="w-full flex-between"
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    background: isSelected
                      ? "var(--surface-hover)"
                      : "transparent",
                    color: isSelected
                      ? "var(--color-gold)"
                      : "var(--text-secondary)",
                    textAlign: "left",
                    fontSize: "var(--text-sm)",
                    transition:
                      "background var(--transition-fast), color var(--transition-fast)",
                    borderBottom:
                      i < options.length - 1
                        ? "1px solid var(--border-subtle)"
                        : "none",
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "var(--surface-hover)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {opt.label}
                  {isSelected && <Check size={13} color="var(--color-gold)" />}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
