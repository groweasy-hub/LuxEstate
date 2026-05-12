"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import LeadForm from "@/components/common/LeadForm";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const contactItems = [
  {
    Icon: Phone,
    text: "+91 99999 99999",
    href: "tel:+919999999999",
    label: "Call us",
  },
  {
    Icon: Mail,
    text: "hello@luxestate.in",
    href: "mailto:hello@luxestate.in",
    label: "Email us",
  },
  {
    Icon: MapPin,
    text: "Bandra West, Mumbai 400050",
    href: null,
    label: "Visit us",
  },
];

export default function CTASection() {
  const ref = useInViewAnimation();
  const [whatsappHover, setWhatsappHover] = useState(false);

  return (
    <section
      className="section"
      style={{
        background: "var(--surface-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative orb */}
      <div
        className="bg-gold-pulse"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Diagonal grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 40px,
          rgba(212,175,55,0.015) 40px,
          rgba(212,175,55,0.015) 41px
        )`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          ref={ref}
          data-reveal
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-16)",
            alignItems: "start",
          }}
        >
          {/* ── Left: Info Column ── */}
          <div>
            <div
              className="section-label"
              style={{ marginBottom: "var(--space-4)" }}
            >
              <span>Get In Touch</span>
            </div>
            <h2 style={{ marginBottom: "var(--space-4)" }}>
              Ready to Find Your
              <br />
              Dream Home?
            </h2>
            <p
              className="lead"
              style={{
                marginBottom: "var(--space-8)",
                color: "var(--text-secondary)",
              }}
            >
              Book a free consultation with our experts. No obligations, just
              honest advice tailored to your needs.
            </p>

            {/* Contact details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                marginBottom: "var(--space-8)",
              }}
            >
              {contactItems.map(({ Icon, text, href, label }) => (
                <motion.div
                  key={text}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      background: "var(--surface-hover)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color="var(--color-gold)" />
                  </div>
                  <div>
                    <span
                      className="overline"
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        display: "block",
                        marginBottom: 1,
                      }}
                    >
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="small"
                        style={{
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          transition: "color var(--transition-normal)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--color-gold)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--text-secondary)")
                        }
                      >
                        {text}
                      </a>
                    ) : (
                      <span
                        className="small"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {text}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20property%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setWhatsappHover(true)}
              onMouseLeave={() => setWhatsappHover(false)}
              animate={{
                scale: whatsappHover ? 1.04 : 1,
                boxShadow: whatsappHover
                  ? "0 0 0 4px rgba(37,211,102,0.2), 0 8px 24px rgba(37,211,102,0.25)"
                  : "0 4px 16px rgba(37,211,102,0.15)",
              }}
              // Periodic wobble every 8s
              whileInView={{}}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-3) var(--space-5)",
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.3)",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <WhatsAppWobble />
              <span
                className="small"
                style={{ color: "#25D366", fontWeight: "var(--weight-medium)" }}
              >
                Chat on WhatsApp
              </span>
            </motion.a>
          </div>

          {/* ── Right: Lead Form ── */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              padding: "var(--space-8)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle gold top border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "var(--space-8)",
                right: "var(--space-8)",
                height: 1,
                background: "var(--gradient-gold)",
                opacity: 0.5,
              }}
            />

            <div style={{ marginBottom: "var(--space-6)" }}>
              <h4 style={{ marginBottom: "var(--space-1)" }}>
                Book Free Consultation
              </h4>
              <p className="small" style={{ color: "var(--text-muted)" }}>
                We respond within 2 hours on business days.
              </p>
            </div>

            <LeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// WhatsApp icon with periodic wobble
function WhatsAppWobble() {
  return (
    <motion.div
      animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 7.5,
        ease: "easeInOut",
      }}
    >
      <MessageCircle size={18} color="#25D366" fill="rgba(37,211,102,0.2)" />
    </motion.div>
  );
}
