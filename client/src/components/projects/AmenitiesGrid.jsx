"use client";
import { motion } from "framer-motion";

const AMENITY_ICONS = {
  pool: "🏊",
  gym: "💪",
  concierge: "🛎️",
  club: "🏛️",
  kids: "🎠",
  jog: "🏃",
  ev: "⚡",
  roof: "🌆",
  biz: "💼",
  yoga: "🧘",
  theatre: "🎬",
  security: "🔒",
  garden: "🌿",
  spa: "🛁",
  tennis: "🎾",
  library: "📚",
  lounge: "🛋️",
  parking: "🅿️",
  wifi: "📶",
  helipad: "🚁",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AmenitiesGrid({ amenities = [] }) {
  return (
    <motion.div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "var(--space-3)",
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {amenities.map((amenity) => {
        const icon = AMENITY_ICONS[amenity.icon] || "✨";
        return (
          <motion.div
            key={amenity.label}
            variants={itemVariants}
            whileHover={{
              y: -4,
              boxShadow: "var(--shadow-gold-sm)",
              borderColor: "var(--border-gold)",
            }}
            className="card flex-center flex-col gap-2"
            style={{
              padding: "var(--space-4) var(--space-3)",
              textAlign: "center",
              cursor: "default",
              transition:
                "border-color var(--transition-fast), box-shadow var(--transition-fast)",
            }}
          >
            <span
              style={{
                fontSize: 28,
                lineHeight: 1,
                filter: "drop-shadow(0 2px 4px rgba(201,168,76,0.25))",
              }}
            >
              {icon}
            </span>
            <span
              className="small"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.3,
                fontSize: "var(--text-xs)",
                letterSpacing: "var(--tracking-wide)",
                textTransform: "uppercase",
                fontFamily: "var(--font-ui)",
              }}
            >
              {amenity.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
