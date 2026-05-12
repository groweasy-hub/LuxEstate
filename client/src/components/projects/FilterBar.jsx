"use client";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

const STATUSES = ["All", "ready", "under-construction"];
const STATUS_LABELS = {
  All: "All Status",
  ready: "Ready to Move",
  "under-construction": "Under Construction",
};

export default function FilterBar({
  filters,
  updateFilter,
  clearFilters,
  isFiltered,
  LOCATIONS,
  TYPES,
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--surface-base)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container" style={{ paddingBlock: "var(--space-4)" }}>
        <div
          style={{
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
            boxShadow: "var(--shadow-card)",
            padding: "var(--space-5)",
          }}
        >
          <div
            className="filterbar-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-5)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(201,168,76,0.10)",
                  border: "1px solid rgba(201,168,76,0.20)",
                  color: "var(--color-gold)",
                  flexShrink: 0,
                }}
              >
                <SlidersHorizontal size={16} />
              </div>
              <div>
                <p
                  className="overline"
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-gold)",
                    marginBottom: 2,
                  }}
                >
                  Filters
                </p>
                <p
                  className="small"
                  style={{ color: "var(--text-muted)", margin: 0 }}
                >
                  Refine by city, property type, status, and budget
                </p>
              </div>
            </div>

            {isFiltered && (
              <motion.button
                onClick={clearFilters}
                className="btn btn-ghost btn-sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  color: "var(--color-accent-danger)",
                  borderColor: "rgba(232,64,64,0.25)",
                  whiteSpace: "nowrap",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <X size={12} /> Clear Filters
              </motion.button>
            )}
          </div>

          <div
            className="filterbar-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(180px, 0.9fr) minmax(240px, 1.45fr) minmax(220px, 1fr)",
              gap: "var(--space-5)",
              alignItems: "start",
            }}
          >
            <FilterGroup label="City">
              <select
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="form-select"
                style={{
                  width: "100%",
                  minHeight: 44,
                  paddingInline: "var(--space-4)",
                  fontSize: "var(--text-sm)",
                  cursor: "pointer",
                  background: "var(--surface-elevated)",
                }}
              >
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location === "All" ? "All Cities" : location}
                  </option>
                ))}
              </select>
            </FilterGroup>

            <FilterGroup label="Property Type" className="filterbar-types">
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-2)",
                  flexWrap: "wrap",
                }}
              >
                {TYPES.map((type) => (
                  <FilterChip
                    key={type}
                    label={type === "All" ? "All Types" : type}
                    active={filters.type === type}
                    onClick={() => updateFilter("type", type)}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Status">
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-2)",
                  flexWrap: "wrap",
                }}
              >
                {STATUSES.map((status) => (
                  <FilterChip
                    key={status}
                    label={STATUS_LABELS[status]}
                    active={filters.status === status}
                    onClick={() => updateFilter("status", status)}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Budget" className="filterbar-budget">
              <div
                className="budget-wrap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--surface-elevated)",
                }}
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                    minWidth: 118,
                  }}
                >
                  Budget:{" "}
                  <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
                    {filters.budget[1] >= 150000000
                      ? "Any"
                      : `Rs ${(filters.budget[1] / 10000000).toFixed(1)} Cr`}
                  </span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={150000000}
                  step={5000000}
                  value={filters.budget[1]}
                  onChange={(e) =>
                    updateFilter("budget", [0, Number(e.target.value)])
                  }
                  style={{
                    accentColor: "var(--color-gold)",
                    cursor: "pointer",
                    width: "100%",
                    minWidth: 160,
                  }}
                />
              </div>
            </FilterGroup>
          </div>
        </div>
      </div>

      <style>{`
        .filterbar-types {
          grid-column: span 2;
        }

        .filterbar-budget {
          grid-column: span 2;
        }

        @media (max-width: 1100px) {
          .filterbar-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .filterbar-types,
          .filterbar-budget {
            grid-column: span 2;
          }
        }

        @media (max-width: 720px) {
          .filterbar-header {
            flex-direction: column;
            align-items: flex-start !important;
          }

          .filterbar-grid {
            grid-template-columns: 1fr !important;
          }

          .filterbar-types,
          .filterbar-budget {
            grid-column: span 1;
          }

          .budget-wrap {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}

function FilterGroup({ label, children, className = "" }) {
  return (
    <div className={className}>
      <p
        className="overline"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--text-muted)",
          marginBottom: "var(--space-3)",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -1 }}
      animate={{ scale: active ? [1, 1.04, 1] : 1 }}
      transition={{ duration: 0.2 }}
      style={{
        padding: "10px 14px",
        borderRadius: "var(--radius-full)",
        fontSize: "var(--text-xs)",
        fontFamily: "var(--font-ui)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        cursor: "pointer",
        border: `1px solid ${active ? "var(--border-gold-strong)" : "var(--border-default)"}`,
        background: active
          ? "linear-gradient(180deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.08) 100%)"
          : "var(--surface-elevated)",
        color: active ? "var(--color-gold)" : "var(--text-secondary)",
        transition: "all var(--transition-fast)",
        whiteSpace: "nowrap",
        boxShadow: active ? "0 10px 22px rgba(201,168,76,0.10)" : "none",
      }}
    >
      {label}
    </motion.button>
  );
}
