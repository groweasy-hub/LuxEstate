"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

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
};

// ─── Amenities Section ────────────────────────────────────────────────────────
export function AmenitiesSection({ amenities = [] }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: "var(--space-3)",
      }}
    >
      {amenities.map((a, i) => (
        <motion.div
          key={a.label}
          className="card flex-center flex-col gap-2 hover-lift"
          style={{
            padding: "var(--space-4)",
            textAlign: "center",
            cursor: "default",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: i * 0.05,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ y: -4, boxShadow: "var(--shadow-gold-sm)" }}
        >
          <span style={{ fontSize: 24 }}>{AMENITY_ICONS[a.icon] || "✨"}</span>
          <span
            className="small"
            style={{ color: "var(--text-secondary)", lineHeight: 1.3 }}
          >
            {a.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Floor Plans Section ──────────────────────────────────────────────────────
export function FloorPlansSection({ plans = [] }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={plan.type}
            className="card hover-lift-gold overflow-hidden"
            style={{ padding: 0, cursor: "pointer" }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => setSelected(plan)}
          >
            <div
              className="relative"
              style={{
                height: 160,
                background: plan.img
                  ? `url(${plan.img}) center/cover`
                  : "var(--surface-elevated)",
              }}
            >
              <div
                className="absolute inset-0 flex-center"
                style={{
                  background: "rgba(8,8,8,0)",
                  transition: "background var(--transition-slow)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(8,8,8,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(8,8,8,0)")
                }
              >
                <ZoomIn
                  size={24}
                  color="#fff"
                  style={{ opacity: 0, transition: "opacity 0.2s" }}
                />
              </div>
              {!plan.img && (
                <div className="absolute inset-0 flex-center flex-col gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--text-3xl)",
                      color: "var(--color-gold)",
                      opacity: 0.3,
                    }}
                  >
                    {plan.type}
                  </span>
                </div>
              )}
            </div>
            <div style={{ padding: "var(--space-4)" }}>
              <h5 style={{ marginBottom: "var(--space-1)" }}>{plan.type}</h5>
              <p className="small" style={{ color: "var(--text-muted)" }}>
                {plan.area}
              </p>
              <p
                className="text-gradient-gold"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-lg)",
                  marginTop: "var(--space-2)",
                }}
              >
                {plan.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex-center"
            style={{ zIndex: "var(--z-modal)", background: "rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative glass"
              style={{
                maxWidth: 600,
                width: "90vw",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  height: 320,
                  background: selected.img
                    ? `url(${selected.img}) center/cover`
                    : "var(--surface-elevated)",
                }}
              />
              <div style={{ padding: "var(--space-6)" }}>
                <h3>{selected.type}</h3>
                <p className="small mt-2">
                  {selected.area} · {selected.price}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 btn btn-icon glass"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Price Table ──────────────────────────────────────────────────────────────
export function PriceTable({ rows = [] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
            {["Configuration", "Area", "Floor", "Price", "Status"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "var(--space-3) var(--space-4)",
                  textAlign: "left",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "var(--tracking-wider)",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  fontWeight: "var(--weight-medium)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={`${row.config}-${i}`}
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                transition: "background var(--transition-fast)",
              }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td
                style={{
                  padding: "var(--space-4)",
                  fontWeight: "var(--weight-medium)",
                  color: "var(--text-primary)",
                }}
              >
                {row.config}
              </td>
              <td
                style={{
                  padding: "var(--space-4)",
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {row.area}
              </td>
              <td
                style={{
                  padding: "var(--space-4)",
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {row.floor}
              </td>
              <td
                style={{
                  padding: "var(--space-4)",
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-lg)",
                }}
              >
                {row.price}
              </td>
              <td style={{ padding: "var(--space-4)" }}>
                <span
                  className={`badge ${
                    row.status === "Available"
                      ? "badge-green"
                      : row.status === "Limited"
                        ? "badge-gold"
                        : "badge-red"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Default export for direct imports
export default FloorPlansSection;
