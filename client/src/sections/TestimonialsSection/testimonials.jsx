"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Purchased 3BHK, Bandra",
    initials: "RS",
    text: "LuxEstate made our home buying journey completely seamless. Their team was professional, transparent, and always available. We got the best deal possible — saved over ₹8 lakhs compared to direct booking!",
    rating: 5,
    color: "#D4AF37",
  },
  {
    name: "Priya Mehta",
    role: "Invested in Powai Project",
    initials: "PM",
    text: "Exceptional service from start to finish. The team understood our requirements perfectly and helped us find the ideal investment property with 18% projected returns. Highly professional throughout.",
    rating: 5,
    color: "#C0A070",
  },
  {
    name: "Vikram Nair",
    role: "Purchased Villa, Lonavala",
    initials: "VN",
    text: "I was skeptical at first, but LuxEstate exceeded all expectations. Their knowledge of the market is unmatched. The site visits were well-organized and the paperwork was handled flawlessly.",
    rating: 5,
    color: "#B8967A",
  },
  {
    name: "Ananya Desai",
    role: "Purchased 2BHK, Thane",
    initials: "AD",
    text: "As a first-time buyer, I had so many questions. The LuxEstate team patiently guided me through everything — from shortlisting to registration. I could not have done it without them!",
    rating: 5,
    color: "#D4AF37",
  },
];

export default function TestimonialsSection() {
  const ref = useInViewAnimation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    }),
  };

  const t = testimonials[current];

  return (
    <section
      className="section"
      style={{
        background: "var(--surface-page)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large background quote mark */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          fontFamily: "Georgia, serif",
          fontSize: "clamp(120px, 20vw, 280px)",
          lineHeight: 1,
          color: "var(--color-gold)",
          opacity: 0.04,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        "
      </div>

      <div className="container">
        {/* Heading */}
        <div
          ref={ref}
          data-reveal
          className="text-center"
          style={{ marginBottom: "var(--space-16)" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span>Testimonials</span>
          </div>
          <h2>What Our Clients Say</h2>
        </div>

        {/* Card area */}
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="card"
              style={{
                padding: "var(--space-10)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gold accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "var(--space-10)",
                  width: 48,
                  height: 2,
                  background: "var(--gradient-gold)",
                  borderRadius: "var(--radius-full)",
                }}
              />

              {/* Quote icon */}
              <Quote
                size={28}
                color="var(--color-gold)"
                style={{
                  opacity: 0.6,
                  marginBottom: "var(--space-6)",
                  display: "block",
                }}
              />

              {/* Text */}
              <p
                className="lead"
                style={{
                  fontStyle: "italic",
                  marginBottom: "var(--space-8)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                }}
              >
                "{t.text}"
              </p>

              {/* Author row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}33, ${t.color}11)`,
                    border: `2px solid ${t.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--weight-medium)",
                    color: t.color,
                  }}
                >
                  {t.initials}
                </div>

                <div>
                  <h5 style={{ marginBottom: 2 }}>{t.name}</h5>
                  <span
                    className="small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.role}
                  </span>
                </div>

                {/* Stars — pushed right */}
                <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill="var(--color-gold)"
                      color="var(--color-gold)"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-4)",
              marginTop: "var(--space-8)",
            }}
          >
            <NavBtn
              onClick={prev}
              label="Previous"
              icon={<ChevronLeft size={18} />}
            />

            {/* Dot indicators */}
            <div
              style={{
                display: "flex",
                gap: "var(--space-2)",
                alignItems: "center",
              }}
            >
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  animate={{
                    width: i === current ? 28 : 8,
                    background:
                      i === current
                        ? "var(--color-gold)"
                        : "var(--border-default)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: 8,
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <NavBtn
              onClick={next}
              label="Next"
              icon={<ChevronRight size={18} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function NavBtn({ onClick, label, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        background: hovered ? "var(--surface-hover)" : "var(--surface-card)",
        borderColor: hovered ? "var(--border-gold)" : "var(--border-subtle)",
        scale: hovered ? 1.08 : 1,
      }}
      transition={{ duration: 0.2 }}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-subtle)",
        background: "var(--surface-card)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--text-secondary)",
        outline: "none",
      }}
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}
