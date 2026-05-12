"use client";
import { motion } from "framer-motion";
import { CalendarDays, Phone, ShieldCheck } from "lucide-react";
import LeadForm from "@/components/common/LeadForm";

export default function StickyLeadForm({ project }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xl)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "var(--space-6)",
          borderBottom: "1px solid var(--border-subtle)",
          background:
            "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 100%)",
        }}
      >
        <div
          className="section-label"
          style={{ marginBottom: "var(--space-3)" }}
        >
          <span>Priority Enquiry</span>
        </div>
        <h3 style={{ marginBottom: "var(--space-2)" }}>
          Book a Site Visit for {project?.title || "this project"}
        </h3>
        <p className="small" style={{ color: "var(--text-secondary)" }}>
          Share your details and our advisor will help with pricing,
          availability, and your next visit slot.
        </p>
      </div>

      <div style={{ padding: "var(--space-6)" }}>
        <div
          className="stack-sm"
          style={{ marginBottom: "var(--space-5)" }}
        >
          {[
            {
              Icon: CalendarDays,
              text: "Free guided site visit scheduling",
            },
            {
              Icon: Phone,
              text: "Fast callback from a project specialist",
            },
            {
              Icon: ShieldCheck,
              text: "Verified inventory and transparent pricing",
            },
          ].map(({ Icon, text }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                color: "var(--text-secondary)",
              }}
            >
              <Icon size={15} color="var(--color-gold)" />
              <span className="small">{text}</span>
            </div>
          ))}
        </div>

        <LeadForm compact />
      </div>
    </motion.aside>
  );
}
