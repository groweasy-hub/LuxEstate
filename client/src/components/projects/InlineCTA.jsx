"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight, Sparkles } from "lucide-react";

export default function InlineCTA() {
  return (
    <motion.div
      className="glass-gold"
      style={{
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-10) var(--space-8)",
        textAlign: "center",
        gridColumn: "1 / -1",
        margin: "var(--space-4) 0",
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 100%)",
        border: "1px solid var(--border-gold)",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* BG glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 400,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="flex-center gap-2"
        style={{ marginBottom: "var(--space-3)" }}
      >
        <Sparkles size={14} color="var(--color-gold)" />
        <span
          style={{
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            color: "var(--color-gold)",
            fontFamily: "var(--font-ui)",
          }}
        >
          Expert Guidance
        </span>
        <Sparkles size={14} color="var(--color-gold)" />
      </div>

      <h3 style={{ marginBottom: "var(--space-3)" }}>
        Need Help Finding the Right Property?
      </h3>
      <p
        className="lead"
        style={{
          maxWidth: 480,
          margin: "0 auto var(--space-6)",
          color: "var(--text-secondary)",
        }}
      >
        Our experts will match you with properties that perfectly fit your
        budget, lifestyle, and investment goals — at zero cost to you.
      </p>

      <div className="flex-center gap-4 flex-wrap">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            href="/contact"
            className="btn btn-primary btn-lg animate-gold-glow hover-nudge-right"
          >
            Get Free Consultation <ArrowRight size={16} className="icon" />
          </Link>
        </motion.div>
        <a
          href="tel:+919999999999"
          className="btn btn-ghost btn-lg flex items-center gap-2"
        >
          <Phone size={15} /> Call Now
        </a>
      </div>
    </motion.div>
  );
}
