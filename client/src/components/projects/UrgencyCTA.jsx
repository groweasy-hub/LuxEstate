"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Flame, Timer } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";

// ─── Countdown hook ────────────────────────────────────────────────────────────
function useCountdown(targetHours = 47) {
  const [time, setTime] = useState({ h: targetHours, m: 59, s: 59 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { ...t, m: t.m - 1, s: 59 };
        if (t.h > 0) return { h: t.h - 1, m: 59, s: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// ─── Digit with flip animation ─────────────────────────────────────────────────
function Digit({ value, label, size = 80, fontSize = "var(--text-4xl)" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "var(--radius-md)",
          background: "var(--surface-elevated)",
          border: "1px solid var(--border-gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-2)",
          overflow: "hidden",
        }}
      >
        <motion.span
          key={value}
          className="font-display"
          style={{
            fontSize,
            color: "var(--color-gold)",
            lineHeight: 1,
            display: "block",
          }}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span
        style={{
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-widest)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-ui)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function UrgencyCTA({ unitsLeft = 7, project }) {
  const time = useCountdown(47);
  const compact = Boolean(project);
  const digitSize = compact ? 64 : 80;
  const digitFontSize = compact ? "var(--text-3xl)" : "var(--text-4xl)";

  return (
    <motion.section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)",
        border: "1px solid var(--border-gold)",
        borderRadius: "var(--radius-2xl)",
        padding: compact
          ? "var(--space-8) var(--space-6)"
          : "var(--space-14) var(--space-10)",
        textAlign: "center",
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 500,
          height: 300,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div className="flex-center gap-2 mb-5">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame size={20} color="var(--color-gold)" />
        </motion.div>
        <span
          style={{
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            color: "var(--color-gold)",
            fontFamily: "var(--font-ui)",
          }}
        >
          High Demand Alert
        </span>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [5, -5, 5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <Flame size={20} color="var(--color-gold)" />
        </motion.div>
      </div>

      <h2
        style={{
          marginBottom: "var(--space-4)",
          fontSize: compact ? "var(--text-2xl)" : "var(--text-4xl)",
          lineHeight: 1.2,
        }}
      >
        Only{" "}
        <motion.span
          className="text-gradient-gold"
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          {unitsLeft} Units
        </motion.span>{" "}
        Remaining
      </h2>

      <p
        className="lead"
        style={{
          maxWidth: compact ? "100%" : 500,
          margin: "0 auto var(--space-10)",
          color: "var(--text-secondary)",
          fontSize: compact ? "var(--text-base)" : undefined,
        }}
      >
        This offer expires soon. Book your complimentary site visit today and
        secure the pre-launch price before it&apos;s too late.
      </p>

      {/* Countdown */}
      <div
        className="flex-center mb-10"
        style={{
          gap: compact ? "var(--space-2)" : "var(--space-4)",
          flexWrap: compact ? "wrap" : "nowrap",
        }}
      >
        <Digit
          value={time.h}
          label="Hours"
          size={digitSize}
          fontSize={digitFontSize}
        />
        <span
          className="font-display"
          style={{
            fontSize: compact ? "var(--text-2xl)" : "var(--text-4xl)",
            color: "var(--color-gold)",
            opacity: 0.5,
            marginBottom: 24,
          }}
        >
          :
        </span>
        <Digit
          value={time.m}
          label="Mins"
          size={digitSize}
          fontSize={digitFontSize}
        />
        <span
          className="font-display"
          style={{
            fontSize: compact ? "var(--text-2xl)" : "var(--text-4xl)",
            color: "var(--color-gold)",
            opacity: 0.5,
            marginBottom: 24,
          }}
        >
          :
        </span>
        <Digit
          value={time.s}
          label="Secs"
          size={digitSize}
          fontSize={digitFontSize}
        />
      </div>

      {/* Timer note */}
      <div
        className="flex-center gap-2 mb-10"
        style={{ color: "var(--text-muted)" }}
      >
        <Timer size={13} />
        <span
          style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-ui)" }}
        >
          Special pre-launch pricing ends when the timer hits zero
        </span>
      </div>

      {/* CTAs */}
      <div className="flex-center gap-4 flex-wrap">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            href="/contact"
            className={`btn btn-primary ${compact ? "" : "btn-lg"} animate-gold-glow`}
          >
            Book Site Visit Now
          </Link>
        </motion.div>
        <a
          href={SITE_CONFIG.phoneHref}
          className={`btn btn-secondary ${compact ? "" : "btn-lg"} flex items-center gap-2`}
        >
          <Phone size={15} /> Call Expert
        </a>
      </div>
    </motion.section>
  );
}
