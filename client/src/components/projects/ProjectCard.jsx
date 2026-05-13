"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bed, Building2, MapPin, Maximize } from "lucide-react";

const formatBeds = (beds) =>
  Array.isArray(beds) ? `${beds[0]}-${beds[beds.length - 1]} BHK` : `${beds} BHK`;

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const cardImage = project.img || project.images?.[0] || "/images/project-1.jpg";
  const imageCount = project.images?.length || (project.img ? 1 : 0);
  const detailItems = [
    { Icon: Bed, value: formatBeds(project.beds) },
    { Icon: Maximize, value: project.area },
    { Icon: Building2, value: project.builder },
  ].filter((item) => item.value);

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 6) * 0.1 }}
    >
      <Link href={`/projects/${project.id}`} style={{ textDecoration: "none", display: "block" }}>
        <motion.div
          ref={cardRef}
          className="card"
          style={{
            padding: 0,
            cursor: "pointer",
            perspective: 900,
            transformStyle: "preserve-3d",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            willChange: "transform",
          }}
          animate={{
            rotateY: tilt.x,
            rotateX: tilt.y,
            boxShadow: hovered
              ? "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.25)"
              : "0 4px 24px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={onMouseLeave}
        >
          {/* Image */}
          <div style={{ position: "relative", height: 230, overflow: "hidden", background: "#1a1208" }}>
            <motion.div
              style={{ width: "100%", height: "100%", background: "#1a1208" }}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={cardImage}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </motion.div>

            {project.badge && (
              <span
                className={`badge ${project.badge === "Featured" ? "badge-gold" : "badge-green"}`}
                style={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}
              >
                {project.badge}
              </span>
            )}

            <span
              className="badge"
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 2,
                background: project.status === "ready" ? "rgba(46,204,113,0.15)" : "rgba(74,168,255,0.15)",
                color: project.status === "ready" ? "#4ade80" : "#4aa8ff",
                border: `1px solid ${project.status === "ready" ? "rgba(46,204,113,0.3)" : "rgba(74,168,255,0.3)"}`,
              }}
            >
              {project.status === "ready" ? "Ready" : "Under Construction"}
            </span>

            {imageCount > 1 && (
              <span
                style={{
                  position: "absolute", bottom: 12, right: 12,
                  background: "rgba(6,6,6,0.7)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "var(--radius-sm)", padding: "2px 8px",
                  fontSize: "var(--text-xs)", color: "var(--text-muted)",
                  fontFamily: "var(--font-ui)", letterSpacing: "0.05em", zIndex: 2,
                }}
              >
                1 / {imageCount}
              </span>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "var(--space-5)", background: "var(--surface-card)" }}>
            <h4
              style={{
                marginBottom: "var(--space-2)",
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-lg)",
                fontWeight: "var(--weight-medium)",
                color: hovered ? "var(--color-gold)" : "var(--text-primary)",
                transition: "color 0.2s",
              }}
            >
              {project.title}
            </h4>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "var(--space-4)" }}>
              <MapPin size={12} color="var(--color-gold)" style={{ display: "block", flexShrink: 0 }} />
              <span className="small" style={{ color: "var(--text-muted)" }}>
                {project.location}, {project.city}
              </span>
            </div>

            <div
              style={{
                display: "flex", flexWrap: "wrap", gap: "var(--space-2)",
                marginBottom: "var(--space-4)", paddingBottom: "var(--space-4)",
                borderBottom: "1px solid var(--border-default)",
              }}
            >
              {detailItems.map(({ Icon, value }) => (
                <span
                  key={value}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "0.42rem 0.7rem", borderRadius: "999px",
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <Icon size={13} color="var(--text-muted)" style={{ display: "block", flexShrink: 0 }} />
                  <span className="small" style={{ color: "var(--text-secondary)" }}>{value}</span>
                </span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                className="text-gradient-gold"
                style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-medium)" }}
              >
                {project.priceLabel || project.price}
              </span>
              <span
                style={{
                  pointerEvents: "none", display: "flex", alignItems: "center", gap: 4,
                  fontSize: "var(--text-xs)", fontFamily: "var(--font-ui)",
                  color: hovered ? "var(--color-gold)" : "var(--text-muted)",
                  fontWeight: hovered ? "var(--weight-medium)" : "var(--weight-regular)",
                  transition: "color 0.2s",
                }}
              >
                Details
                <ArrowRight
                  size={12}
                  style={{
                    display: "block",
                    transform: hovered ? "translateX(3px)" : "translateX(0)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
