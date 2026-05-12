"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Bed, Maximize, Star } from "lucide-react";

export default function RelatedCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [detailsHovered, setDetailsHovered] = useState(false);
  const ref = useRef(null);
  const cardImage = project.img || project.images?.[0] || "/images/project-1.jpg";

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -7;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      className="card hover-lift-gold overflow-hidden group flex-shrink-0"
      style={{
        padding: 0,
        width: 300,
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.15s ease, box-shadow var(--transition-slow)",
      }}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            transition: "transform var(--duration-slower) var(--ease-out-expo)",
          }}
          className="group-hover:scale-[1.08]"
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
        </div>
        {project.badge && (
          <span
            className={`badge absolute top-3 left-3 ${
              project.badge === "Featured" ? "badge-gold" : "badge-green"
            }`}
          >
            {project.badge === "Featured" && (
              <Star size={9} fill="currentColor" />
            )}{" "}
            {project.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "var(--space-4)" }}>
        <h5
          style={{
            marginBottom: "var(--space-1)",
            fontSize: "var(--text-base)",
          }}
        >
          {project.title}
        </h5>
        <div className="flex items-center gap-1 mb-2">
          <MapPin size={11} color="var(--color-gold)" />
          <span className="small" style={{ color: "var(--text-secondary)" }}>
            {project.location}, {project.city}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Bed size={12} color="var(--text-muted)" />
            <span className="small">
              {Array.isArray(project.beds)
                ? `${project.beds[0]}–${project.beds[project.beds.length - 1]} BHK`
                : `${project.beds} BHK`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={12} color="var(--text-muted)" />
            <span className="small">{project.area}</span>
          </div>
        </div>
        <div className="flex-between">
          <span
            className="text-gradient-gold"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-lg)",
            }}
          >
            {project.priceLabel}
          </span>
          <Link
            href={`/projects/${project.id}`}
            className="btn btn-sm hover-nudge-right"
            style={{
              color: "var(--color-gold)",
              border: "1px solid var(--border-gold-strong)",
              background: "rgba(201,168,76,0.08)",
            }}
            onMouseEnter={() => setDetailsHovered(true)}
            onMouseLeave={() => setDetailsHovered(false)}
          >
            {detailsHovered ? "View Details" : "Details"}{" "}
            <ArrowRight size={11} className="icon" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
