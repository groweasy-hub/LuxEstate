"use client";
import { motion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";

export default function LoadMore({ onLoad, hasMore, loading }) {
  if (!hasMore) return null;

  return (
    <div
      className="text-center"
      style={{ marginTop: "var(--space-12)", gridColumn: "1 / -1" }}
    >
      <motion.button
        onClick={onLoad}
        disabled={loading}
        className="btn btn-secondary btn-lg"
        style={{
          gap: "var(--space-3)",
          minWidth: 220,
          justifyContent: "center",
        }}
        whileHover={
          !loading ? { scale: 1.03, boxShadow: "var(--shadow-gold-md)" } : {}
        }
        whileTap={!loading ? { scale: 0.97 } : {}}
      >
        {loading ? (
          <>
            <Loader2
              size={16}
              style={{
                animation: "loadmore-spin 0.8s linear infinite",
                flexShrink: 0,
              }}
            />
            Loading…
          </>
        ) : (
          <>
            Load More Properties
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </>
        )}
      </motion.button>

      <style>{`
        @keyframes loadmore-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
