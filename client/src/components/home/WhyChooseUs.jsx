"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { Shield, Award, Clock, Users, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const stats = [
  { icon: Award, value: 200, suffix: "+", label: "Projects Delivered" },
  { icon: Users, value: 5000, suffix: "+", label: "Happy Families" },
  { icon: Clock, value: 12, suffix: " Yrs", label: "Of Excellence" },
  { icon: Shield, value: 98, suffix: "%", label: "Client Satisfaction" },
];

const features = [
  {
    icon: Shield,
    title: "RERA Verified",
    desc: "All projects are RERA registered and legally verified, protecting your investment at every step.",
  },
  {
    icon: Award,
    title: "Award Winning",
    desc: "Recognised as the best channel partner 3 consecutive years running by leading builders.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    desc: "Dedicated relationship managers assigned to every client for a personalised journey.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock assistance throughout your property search, purchase and beyond.",
  },
];

/* ─────────────────────────────────────────
   Animation variants
───────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─────────────────────────────────────────
   Counter — animates 0 → target when inView
───────────────────────────────────────── */
function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    const duration = 1800; // ms

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   Stat Card
───────────────────────────────────────── */
function StatCard({ icon: Icon, value, suffix, label, inView }) {
  return (
    <motion.div
      variants={itemVariants}
      className="card hover-lift-gold"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "var(--space-6, 1.5rem) var(--space-5, 1.25rem)",
        gap: "var(--space-3, 0.75rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow behind icon */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 80,
          background:
            "radial-gradient(ellipse at top, rgba(201,168,76,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "var(--radius-md, 10px)",
          background: "var(--surface-hover, rgba(201,168,76,0.08))",
          border: "1px solid rgba(201,168,76,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={22} color="var(--color-gold, #C9A84C)" />
      </div>

      {/* Animated number */}
      <div
        className="text-gradient-gold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-4xl, 2.25rem)",
          fontWeight: "var(--weight-light, 300)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        <Counter target={value} suffix={suffix} inView={inView} />
      </div>

      {/* Label */}
      <p
        className="small"
        style={{
          margin: 0,
          color: "var(--text-muted)",
          fontFamily: "var(--font-ui)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: "var(--text-xs, 0.7rem)",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Feature Card
───────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="card hover-lift-gold hover-border-gold"
      style={{
        padding: "var(--space-6, 1.5rem)",
        position: "relative",
        overflow: "hidden",
        transition:
          "border-color var(--transition-base), box-shadow var(--transition-slow)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.07), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-md, 10px)",
          background: "var(--surface-hover, rgba(201,168,76,0.07))",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(201,168,76,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-4, 1rem)",
          transition: "background 0.3s, border-color 0.3s",
          ...(hovered
            ? {
                background: "rgba(201,168,76,0.14)",
                borderColor: "rgba(201,168,76,0.35)",
              }
            : {}),
        }}
      >
        <Icon size={20} color="var(--color-gold, #C9A84C)" />
      </div>

      {/* Title */}
      <h5
        style={{
          marginBottom: "var(--space-2, 0.5rem)",
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-base, 1rem)",
          fontWeight: "var(--weight-semibold, 600)",
          color: hovered ? "var(--color-gold, #C9A84C)" : "var(--text-primary)",
          transition: "color 0.25s",
        }}
      >
        {title}
      </h5>

      {/* Description */}
      <p
        className="small"
        style={{
          margin: 0,
          color: "var(--text-muted)",
          lineHeight: 1.65,
        }}
      >
        {desc}
      </p>

      {/* Check indicator */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 0 : -6,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: "var(--space-5, 1.25rem)",
          right: "var(--space-5, 1.25rem)",
        }}
      >
        <CheckCircle2
          size={16}
          color="var(--color-gold, #C9A84C)"
          style={{ display: "block" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Section — WhyChooseUs
───────────────────────────────────────── */
export default function WhyChooseUs() {
  const headingRef = useInViewAnimation();

  // Stats visibility — triggers counter
  const statsWrapRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "var(--surface-page)",
        paddingBlock: "var(--space-20, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background orb */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-10%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* ── Heading ── */}
        <div
          ref={headingRef}
          data-reveal
          className="text-center"
          style={{ marginBottom: "var(--space-16, 4rem)" }}
        >
          <div
            className="section-label"
            style={{
              justifyContent: "center",
              marginBottom: "var(--space-4, 1rem)",
            }}
          >
            <span>Why Choose Us</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light, 300)",
              marginBottom: 0,
            }}
          >
            Built on Trust &amp; Excellence
          </h2>
        </div>

        {/* ── Stats Grid ── */}
        <motion.div
          ref={statsWrapRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "var(--space-5, 1.25rem)",
            marginBottom: "var(--space-16, 4rem)",
          }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} inView={statsInView} />
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <div
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
            marginBottom: "var(--space-16, 4rem)",
          }}
        />

        {/* ── Features Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "var(--space-5, 1.25rem)",
          }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
