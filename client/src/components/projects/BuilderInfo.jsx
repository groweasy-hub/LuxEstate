"use client";
import { motion } from "framer-motion";
import { Award, Calendar, Building2, Users } from "lucide-react";

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function BuilderInfo({ builder }) {
  if (!builder) return null;

  const stats = [
    {
      icon: Calendar,
      label: "Years Experience",
      value: builder.yearsExp || "25+",
    },
    {
      icon: Building2,
      label: "Projects Delivered",
      value: builder.projectsDelivered || "80+",
    },
    {
      icon: Users,
      label: "Happy Families",
      value: builder.happyFamilies || "12,000+",
    },
    { icon: Award, label: "Awards Won", value: builder.awards || "15+" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Builder header */}
      <div
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "var(--space-6)",
          alignItems: "center",
          marginBottom: "var(--space-6)",
        }}
      >
        {/* Logo placeholder */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "var(--radius-lg)",
            background: builder.logo
              ? `url(${builder.logo}) center/cover`
              : "linear-gradient(135deg, var(--surface-elevated), var(--surface-card))",
            border: "1px solid var(--border-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {!builder.logo && (
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-2xl)",
                color: "var(--color-gold)",
              }}
            >
              {(builder.name || "B").charAt(0)}
            </span>
          )}
        </div>

        <div>
          <p className="overline" style={{ marginBottom: "var(--space-1)" }}>
            Developer / Builder
          </p>
          <h4 style={{ marginBottom: "var(--space-2)" }}>{builder.name}</h4>
          <p
            className="small"
            style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
          >
            {builder.description ||
              `${builder.name} is a leading real estate developer known for delivering premium residential and commercial projects with world-class amenities.`}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="card flex-center flex-col gap-2"
              style={{ padding: "var(--space-5)", textAlign: "center" }}
              custom={i}
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -3, boxShadow: "var(--shadow-gold-sm)" }}
            >
              <Icon size={18} color="var(--color-gold)" />
              <span
                className="text-gradient-gold"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-2xl)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="small"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wide)",
                  fontFamily: "var(--font-ui)",
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* RERA & certifications */}
      {builder.rera && (
        <div
          style={{
            marginTop: "var(--space-5)",
            padding: "var(--space-4) var(--space-5)",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-elevated)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
          }}
        >
          <Award size={16} color="var(--color-gold)" />
          <span className="small" style={{ color: "var(--text-secondary)" }}>
            RERA Registration:{" "}
            <span
              style={{
                color: "var(--color-gold)",
                fontFamily: "var(--font-ui)",
              }}
            >
              {builder.rera}
            </span>
          </span>
        </div>
      )}
    </motion.section>
  );
}
