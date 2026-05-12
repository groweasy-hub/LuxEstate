"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Train,
  Plane,
  ShoppingBag,
} from "lucide-react";

const LANDMARK_ICONS = {
  metro: Train,
  airport: Plane,
  mall: ShoppingBag,
  default: Navigation,
};

const categoryColors = {
  transport: "var(--color-gold)",
  education: "#4aa8ff",
  healthcare: "#4ade80",
  entertainment: "#f472b6",
  default: "var(--text-muted)",
};

export default function LocationMap({ project }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const landmarks = project?.landmarks || [
    {
      name: "International Airport",
      distance: "25 min",
      category: "transport",
      icon: "airport",
    },
    {
      name: "Metro Station",
      distance: "5 min",
      category: "transport",
      icon: "metro",
    },
    {
      name: "Premium Mall",
      distance: "10 min",
      category: "entertainment",
      icon: "mall",
    },
    {
      name: "Tech Park",
      distance: "15 min",
      category: "transport",
      icon: "default",
    },
    {
      name: "Top School",
      distance: "8 min",
      category: "education",
      icon: "default",
    },
    {
      name: "Hospital",
      distance: "12 min",
      category: "healthcare",
      icon: "default",
    },
    {
      name: "Railway Station",
      distance: "20 min",
      category: "transport",
      icon: "default",
    },
    {
      name: "City Centre",
      distance: "18 min",
      category: "entertainment",
      icon: "default",
    },
  ];

  const categories = ["all", ...new Set(landmarks.map((l) => l.category))];

  const filtered =
    activeCategory === "all"
      ? landmarks
      : landmarks.filter((l) => l.category === activeCategory);

  const mapSrc = project?.mapEmbedUrl
    ? project.mapEmbedUrl
    : `https://maps.google.com/maps?q=${encodeURIComponent(
        (project?.location || "Hyderabad") + ", " + (project?.city || "India"),
      )}&output=embed`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Map embed */}
      <div
        style={{
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          height: 360,
          border: "1px solid var(--border-subtle)",
          marginBottom: "var(--space-8)",
          position: "relative",
          background: "var(--surface-elevated)",
        }}
      >
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter:
              "grayscale(30%) contrast(1.1) invert(0.92) hue-rotate(185deg)",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Project Location"
        />
        {/* Address overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "var(--space-4)",
            left: "var(--space-4)",
            padding: "var(--space-3) var(--space-4)",
            borderRadius: "var(--radius-md)",
            background: "rgba(8,8,8,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <MapPin size={14} color="var(--color-gold)" />
          <span className="small" style={{ color: "var(--text-primary)" }}>
            {project?.address || `${project?.location}, ${project?.city}`}
          </span>
        </div>
      </div>

      {/* Category filter */}
      <div
        className="flex gap-2 flex-wrap"
        style={{ marginBottom: "var(--space-5)" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "var(--space-1) var(--space-3)",
              borderRadius: "var(--radius-full)",
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-ui)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "capitalize",
              cursor: "pointer",
              border: `1px solid ${
                activeCategory === cat
                  ? "var(--border-gold-strong)"
                  : "var(--border-default)"
              }`,
              background:
                activeCategory === cat
                  ? "var(--surface-active)"
                  : "transparent",
              color:
                activeCategory === cat
                  ? "var(--color-gold)"
                  : "var(--text-muted)",
              transition: "all var(--transition-fast)",
            }}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Landmarks grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "var(--space-3)",
        }}
      >
        {filtered.map((landmark, i) => {
          const Icon = LANDMARK_ICONS[landmark.icon] || LANDMARK_ICONS.default;
          const color =
            categoryColors[landmark.category] || categoryColors.default;

          return (
            <motion.div
              key={landmark.name}
              className="card flex items-center gap-3"
              style={{ padding: "var(--space-4)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ y: -2, boxShadow: "var(--shadow-gold-sm)" }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-sm)",
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color={color} />
              </div>
              <div>
                <p
                  className="small"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: "var(--weight-medium)",
                  }}
                >
                  {landmark.name}
                </p>
                <div className="flex items-center gap-1">
                  <Clock size={10} color="var(--text-muted)" />
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-gold)",
                      fontFamily: "var(--font-ui)",
                    }}
                  >
                    {landmark.distance}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
