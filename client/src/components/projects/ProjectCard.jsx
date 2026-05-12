"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bed,
  Building2,
  MapPin,
  Maximize,
  Star,
} from "lucide-react";

const formatBeds = (beds) =>
  Array.isArray(beds)
    ? `${beds[0]}-${beds[beds.length - 1]} BHK`
    : `${beds} BHK`;

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const router = useRouter();
  const cardImage =
    project.img || project.images?.[0] || "/images/project-1.jpg";
  const detailItems = [
    { Icon: Bed, value: formatBeds(project.beds) },
    { Icon: Maximize, value: project.area },
    { Icon: Building2, value: project.builder },
  ].filter((item) => item.value);

  return (
    <motion.div
      ref={cardRef}
      className="group"
      onClick={() => router.push(`/projects/${project.id}`)}
      style={{
        position: "relative",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
        cursor: "pointer",
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div
        className="relative"
        style={{ height: 280, overflow: "hidden", background: "#0a0a0a" }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #1a1208 0%, #2a1f0a 100%)",
          }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={cardImage}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>

        {/* Badges */}
        {project.badge && (
          <motion.span
            className={`badge absolute top-4 left-4 ${
              project.badge === "Featured"
                ? "badge-gold animate-gold-glow"
                : "badge-green"
            }`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          >
            {project.badge === "Featured" && (
              <Star size={9} fill="currentColor" />
            )}
            {project.badge}
          </motion.span>
        )}

        <motion.span
          className="absolute top-4 right-4 badge"
          style={{
            background:
              project.status === "ready"
                ? "rgba(46,204,113,0.15)"
                : "rgba(74,168,255,0.15)",
            color: project.status === "ready" ? "#4ade80" : "#4aa8ff",
            border: `1px solid ${
              project.status === "ready"
                ? "rgba(46,204,113,0.3)"
                : "rgba(74,168,255,0.3)"
            }`,
          }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
        >
          {project.status === "ready" ? "Ready" : "Under Construction"}
        </motion.span>
      </div>

      {/* Content Section */}
      <div style={{ padding: "var(--space-6)" }}>
        <motion.h4
          className="mb-2"
          style={{
            fontSize: "var(--text-xl)",
            lineHeight: 1.3,
            color: isHovered ? "var(--color-gold)" : "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
        >
          {project.title}
        </motion.h4>

        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-5)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
        >
          <MapPin
            size={14}
            color="var(--color-gold)"
            style={{ flexShrink: 0, display: "block" }}
          />
          <span className="small" style={{ color: "var(--text-secondary)", lineHeight: 1 }}>
            {project.location}, {project.city}
          </span>
        </motion.div>

        {/* Details Pills */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            flexWrap: "wrap",
            marginBottom: "var(--space-5)",
            paddingBottom: "var(--space-5)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
        >
          {detailItems.map(({ Icon, value }) => (
            <motion.span
              key={value}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.2rem 0.5rem",
                borderRadius: "999px",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid var(--border-subtle)",
                transition: "all 0.3s ease",
              }}
              whileHover={{
                background: "rgba(201,168,76,0.15)",
                borderColor: "var(--border-gold)",
              }}
            >
              <Icon size={10} color="var(--text-muted)" />
              <span className="small" style={{ color: "var(--text-primary)" }}>
                {value}
              </span>
            </motion.span>
          ))}
        </motion.div>

        {/* Price & CTA */}
        <motion.div
          className="flex-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
        >
          <div>
            <p
              className="overline"
              style={{ marginBottom: "var(--space-1)", fontSize: "0.65rem" }}
            >
              Starting From
            </p>
            <span
              className="text-gradient-gold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-2xl)",
                fontWeight: "var(--weight-medium)",
              }}
            >
              {project.priceLabel}
            </span>
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="btn btn-sm"
            style={{
              color: isHovered ? "var(--color-black)" : "var(--color-gold)",
              border: "1px solid var(--border-gold-strong)",
              background: isHovered
                ? "var(--color-gold)"
                : "rgba(201,168,76,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
          >
            Details
            <motion.div
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={12} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
