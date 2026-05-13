"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bed,
  Building2,
  MapPin,
  Maximize,
} from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const formatBeds = (beds) =>
  Array.isArray(beds) ? `${beds[0]}-${beds[beds.length - 1]} BHK` : `${beds} BHK`;

export default function FeaturedProjects({ projects = [] }) {
  const headingRef = useInViewAnimation();
  const featured = projects.slice(0, 3);

  if (!featured.length) return null;

  return (
    <section
      className="section"
      style={{ background: "var(--surface-base)", overflow: "hidden" }}
    >
      <div className="container">
        <div
          ref={headingRef}
          data-reveal
          className="text-center"
          style={{ marginBottom: "var(--space-14, 3.5rem)" }}
        >
          <div
            className="section-label"
            style={{
              justifyContent: "center",
              marginBottom: "var(--space-4, 1rem)",
            }}
          >
            <span>Featured Properties</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light, 300)",
              marginBottom: "var(--space-4, 1rem)",
            }}
          >
            Handpicked Luxury Projects
          </h2>
          <p
            className="lead"
            style={{
              maxWidth: 500,
              margin: "0 auto",
              color: "var(--text-secondary, rgba(245,240,232,0.65))",
            }}
          >
            Explore our curated selection of premium properties across prime
            city locations.
          </p>
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-6, 1.5rem)",
          }}
        >
          {featured.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          style={{ marginTop: "var(--space-14, 3.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/projects"
            className="btn btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2, 0.5rem)",
            }}
          >
            View All Projects
            <ArrowRight
              size={14}
              style={{ display: "block", transition: "transform 0.2s ease" }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }) {
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

  const onMouseMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/projects/${project.id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <motion.div
          ref={cardRef}
          className="card"
          style={{
            padding: 0,
            cursor: "pointer",
            perspective: 900,
            transformStyle: "preserve-3d",
            borderRadius: "var(--radius-xl, 16px)",
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
          <div
            style={{
              position: "relative",
              height: 230,
              overflow: "hidden",
              background: "#1a1208",
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                background: "#1a1208",
              }}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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

            {project.badge && (
              <span
                className={`badge ${
                  project.badge === "Featured" ? "badge-gold" : "badge-green"
                }`}
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  zIndex: 2,
                }}
              >
                {project.badge}
              </span>
            )}

            <span
              className="badge"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 2,
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
            >
              {project.status === "ready" ? "Ready" : "Under Construction"}
            </span>

            {imageCount > 1 && (
              <span
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  background: "rgba(6,6,6,0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "var(--radius-sm, 4px)",
                  padding: "2px 8px",
                  fontSize: "var(--text-xs, 0.68rem)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-ui)",
                  letterSpacing: "0.05em",
                  zIndex: 2,
                }}
              >
                1 / {imageCount}
              </span>
            )}
          </div>

          <div
            style={{
              padding: "var(--space-5, 1.25rem)",
              background: "var(--surface-card, rgba(14,14,14,0.95))",
            }}
          >
            <h4
              style={{
                marginBottom: "var(--space-2, 0.5rem)",
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-lg, 1.125rem)",
                fontWeight: "var(--weight-medium, 500)",
                color: hovered
                  ? "var(--color-gold, #C9A84C)"
                  : "var(--text-primary)",
                transition: "color 0.2s",
              }}
            >
              {project.title}
            </h4>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: "var(--space-4, 1rem)",
              }}
            >
              <MapPin
                size={12}
                color="var(--color-gold, #C9A84C)"
                style={{ display: "block", flexShrink: 0 }}
              />
              <span className="small" style={{ color: "var(--text-muted)" }}>
                {project.location}, {project.city}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-2, 0.5rem)",
                marginBottom: "var(--space-4, 1rem)",
                paddingBottom: "var(--space-4, 1rem)",
                borderBottom:
                  "1px solid var(--border-default, rgba(255,255,255,0.07))",
              }}
            >
              {detailItems.map(({ Icon, value }) => (
                <span
                  key={value}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "0.42rem 0.7rem",
                    borderRadius: "999px",
                    background: "var(--surface-elevated, rgba(255,255,255,0.03))",
                    border:
                      "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                  }}
                >
                  <Icon
                    size={13}
                    color="var(--text-muted, rgba(245,240,232,0.4))"
                    style={{ display: "block", flexShrink: 0 }}
                  />
                  <span
                    className="small"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {value}
                  </span>
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                className="text-gradient-gold"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-xl, 1.25rem)",
                  fontWeight: "var(--weight-medium, 500)",
                }}
              >
                {project.priceLabel || project.price}
              </span>
              <span
                className="btn btn-ghost btn-sm"
                style={{
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "var(--text-xs, 0.75rem)",
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
