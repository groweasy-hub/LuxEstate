"use client";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Maximize,
  Calendar,
  Building2,
  ShieldCheck,
} from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ProjectSummary({ project }) {
  if (!project) return null;

  const stats = [
    {
      icon: MapPin,
      label: "Location",
      value: `${project.location}, ${project.city}`,
    },
    {
      icon: Bed,
      label: "Configuration",
      value: Array.isArray(project.beds)
        ? project.beds.map((b) => `${b} BHK`).join(", ")
        : `${project.beds} BHK`,
    },
    {
      icon: Maximize,
      label: "Area Range",
      value: project.areaRange || project.area || "1,200 – 4,500 sq.ft",
    },
    {
      icon: Building2,
      label: "Builder",
      value: project.builder,
    },
    {
      icon: Calendar,
      label: "Possession",
      value: project.possession || "Dec 2026",
    },
    {
      icon: ShieldCheck,
      label: "RERA No.",
      value: project.rera || "P02400012345",
    },
  ];

  return (
    <motion.section
      style={{
        borderRadius: "var(--radius-2xl)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-card)",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div
        style={{
          padding: "var(--space-6) var(--space-8)",
          borderBottom: "1px solid var(--border-subtle)",
          background:
            "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 100%)",
        }}
      >
        <div className="flex-between flex-wrap gap-4">
          <div>
            {project.badge && (
              <span
                className={`badge ${project.badge === "Featured" ? "badge-gold" : "badge-green"}`}
                style={{
                  marginBottom: "var(--space-3)",
                  display: "inline-flex",
                }}
              >
                {project.badge}
              </span>
            )}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-4xl)",
                lineHeight: 1.1,
                marginBottom: "var(--space-2)",
              }}
            >
              {project.title}
            </h1>
            <div className="flex items-center gap-2">
              <MapPin size={14} color="var(--color-gold)" />
              <span
                className="small"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.location}, {project.city}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--border-default)",
                }}
              />
              <span
                className="badge"
                style={{
                  background:
                    project.status === "ready"
                      ? "rgba(74,222,128,0.1)"
                      : "rgba(74,168,255,0.1)",
                  color: project.status === "ready" ? "#4ade80" : "#4aa8ff",
                  border: `1px solid ${
                    project.status === "ready"
                      ? "rgba(74,222,128,0.3)"
                      : "rgba(74,168,255,0.3)"
                  }`,
                }}
              >
                {project.status === "ready"
                  ? "Ready to Move"
                  : "Under Construction"}
              </span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p className="overline" style={{ marginBottom: "var(--space-1)" }}>
              Starting Price
            </p>
            <p
              className="text-gradient-gold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-4xl)",
                lineHeight: 1,
              }}
            >
              {project.priceRange || project.priceLabel}
            </p>
            <p
              className="small"
              style={{
                color: "var(--text-muted)",
                marginTop: "var(--space-1)",
              }}
            >
              onwards (all inclusive)
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          padding: "var(--space-6) var(--space-8)",
          gap: 0,
        }}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              style={{
                padding: "var(--space-4) var(--space-5)",
                borderRight:
                  i < stats.length - 1
                    ? "1px solid var(--border-subtle)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              <div className="flex items-center gap-2">
                <Icon size={13} color="var(--color-gold)" />
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wider)",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-primary)",
                  fontWeight: "var(--weight-medium)",
                  lineHeight: 1.4,
                }}
              >
                {stat.value}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
