"use client";
import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";

export default function EmptyState({ onClear }) {
  return (
    <motion.div
      className="flex-center flex-col text-center"
      style={{
        padding: "var(--space-24) var(--space-6)",
        gridColumn: "1 / -1",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated icon container */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "var(--surface-elevated)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-6)",
          position: "relative",
        }}
      >
        <Search size={36} color="var(--text-muted)" />
        {/* Pulse ring */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid var(--border-gold)",
          }}
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>

      <h3 style={{ marginBottom: "var(--space-3)" }}>No Properties Found</h3>

      <p
        className="lead"
        style={{
          maxWidth: 400,
          marginBottom: "var(--space-3)",
          color: "var(--text-secondary)",
        }}
      >
        No properties match your current filters. Try adjusting your search
        criteria to discover more options.
      </p>

      <p
        className="small"
        style={{ color: "var(--text-muted)", marginBottom: "var(--space-8)" }}
      >
        Tip: Widening the budget range or selecting "All Cities" often reveals
        more results.
      </p>

      <div className="flex gap-3 flex-wrap flex-center">
        <button
          onClick={onClear}
          className="btn btn-secondary flex items-center gap-2"
        >
          <X size={14} /> Clear All Filters
        </button>
        <button
          onClick={onClear}
          className="btn btn-ghost flex items-center gap-2"
        >
          <SlidersHorizontal size={14} /> Adjust Filters
        </button>
      </div>
    </motion.div>
  );
}
