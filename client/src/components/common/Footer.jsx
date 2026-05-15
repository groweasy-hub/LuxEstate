"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Shield,
  Award,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";

function SocialIconBase({ size = 15, children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <SocialIconBase {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </SocialIconBase>
  );
}

function YoutubeIcon(props) {
  return (
    <SocialIconBase {...props}>
      <path d="M21 12c0 2.9-.2 4.7-.8 5.7-.5.9-1.3 1.4-2.3 1.7-1.2.3-3.3.6-5.9.6s-4.7-.3-5.9-.6c-1-.3-1.8-.8-2.3-1.7C3.2 16.7 3 14.9 3 12s.2-4.7.8-5.7c.5-.9 1.3-1.4 2.3-1.7C7.3 4.3 9.4 4 12 4s4.7.3 5.9.6c1 .3 1.8.8 2.3 1.7.6 1 .8 2.8.8 5.7Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </SocialIconBase>
  );
}

function LinkedInIcon(props) {
  return (
    <SocialIconBase {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 10v6" />
      <path d="M8 8.1h.01" />
      <path d="M12 16v-3.2c0-1.2.8-2 1.8-2s1.7.7 1.7 2V16" />
      <path d="M12 10v6" />
    </SocialIconBase>
  );
}

function TwitterXIcon(props) {
  return (
    <SocialIconBase {...props}>
      <path d="M5 4h3.7l4 5.4L17.2 4H19l-5.4 6.7L19.5 20h-3.7l-4.3-5.8L6.8 20H5l5.7-7.1L5 4Z" />
    </SocialIconBase>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const NAV_COLS = [
  {
    title: "Discover",
    items: [
      { label: "All Projects", href: "/projects" },
      { label: "Luxury Villas", href: "/projects?type=villa" },
      { label: "Apartments", href: "/projects?type=apartment" },
      { label: "Plots & Land", href: "/projects?type=plot" },
      { label: "New Launches", href: "/projects?badge=new" },
      { label: "Featured", href: "/projects?badge=featured" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership Team", href: "/about#team" },
      { label: "Careers", href: "/about#careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Testimonials", href: "/about#reviews" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "Site Visit", href: "/contact#visit" },
      { label: "EMI Calculator", href: "/tools/emi" },
      { label: "Home Loan Guide", href: "/resources/home-loan" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const SOCIALS = [
  {
    Icon: InstagramIcon,
    href: "https://instagram.com",
    label: "Instagram",
    color: "#E1306C",
  },
  {
    Icon: YoutubeIcon,
    href: "https://youtube.com",
    label: "YouTube",
    color: "#FF0000",
  },
  {
    Icon: LinkedInIcon,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    Icon: TwitterXIcon,
    href: "https://twitter.com",
    label: "Twitter / X",
    color: "#1DA1F2",
  },
];

const TRUST_BADGES = [
  { Icon: Shield, label: "RERA Registered" },
  { Icon: Award, label: "Award Winning" },
  { Icon: CheckCircle, label: "Zero Brokerage" },
];

const CITIES = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Pune",
  "Chennai",
  "Delhi NCR",
];

// ─── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <div>
      <p
        style={{
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wider)",
          color: "var(--color-gold)",
          fontFamily: "var(--font-ui)",
          marginBottom: "var(--space-3)",
        }}
      >
        Property Alerts
      </p>
      <p
        className="small"
        style={{
          color: "var(--text-muted)",
          marginBottom: "var(--space-4)",
          lineHeight: 1.6,
        }}
      >
        Get notified about exclusive launches, pre-launch prices and investment
        opportunities.
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
          style={{
            padding: "var(--space-3) var(--space-4)",
            borderRadius: "var(--radius-sm)",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.25)",
          }}
        >
          <CheckCircle size={15} color="#4ade80" />
          <span className="small" style={{ color: "#4ade80" }}>
            You&apos;re subscribed! We&apos;ll be in touch.
          </span>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
          }}
        >
          <div style={{ position: "relative" }}>
            <Mail
              size={14}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "var(--space-3) var(--space-3) var(--space-3) 36px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${status === "error" ? "var(--color-accent-danger)" : "var(--border-default)"}`,
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontSize: "var(--text-sm)",
                outline: "none",
                transition: "border-color var(--transition-fast)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--border-gold-strong)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor =
                  status === "error"
                    ? "var(--color-accent-danger)"
                    : "var(--border-default)")
              }
            />
          </div>
          {status === "error" && (
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-accent-danger)",
                marginTop: -8,
              }}
            >
              Please enter a valid email address.
            </p>
          )}
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary w-full"
            style={{ justifyContent: "center", gap: "var(--space-2)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {status === "loading" ? (
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  animation: "footer-spin 0.8s linear infinite",
                  display: "inline-block",
                }}
              />
            ) : (
              <>
                Subscribe <ArrowRight size={14} />
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}

// ─── Stagger container ─────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Main Footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <footer
      ref={ref}
      style={{
        background: "var(--surface-base)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Top CTA bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          background:
            "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      >
        <div
          className="container"
          style={{
            paddingBlock: "var(--space-8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-6)",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-2xl)",
                marginBottom: "var(--space-2)",
              }}
            >
              Ready to find your{" "}
              <span className="text-gradient-gold">dream home?</span>
            </h3>
            <p className="small" style={{ color: "var(--text-muted)" }}>
              Book a free site visit — no commitment required.
            </p>
          </div>
          <div
            className="flex flex-wrap"
            style={{ columnGap: "var(--space-4)", rowGap: "var(--space-3)" }}
          >
            <Link
              href="/contact"
              className="btn btn-primary animate-gold-glow hover-nudge-right"
            >
              Book Site Visit <ArrowRight size={14} className="icon" />
            </Link>
            <a
              href={SITE_CONFIG.phoneHref}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Main footer body ── */}
      <div
        className="container"
        style={{
          paddingTop: "var(--space-14)",
          paddingBottom: "var(--space-10)",
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "var(--space-10)",
            alignItems: "start",
          }}
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} style={{ gridColumn: "span 1" }}>
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginBottom: "var(--space-7)",
              }}
            >
              <span
                className="text-gradient-gold"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--weight-light)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {SITE_CONFIG.brandName}
              </span>
            </Link>

            <p
              className="small"
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: 220,
                marginBottom: "var(--space-8)",
              }}
            >
              A modern premium real estate partner helping buyers make
              confident property decisions since {SITE_CONFIG.sinceYear}.
            </p>

            {/* Trust badges */}
            <div
              className="stack-sm"
              style={{ marginBottom: "var(--space-8)" }}
            >
              {TRUST_BADGES.map(({ Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                  }}
                >
                  <Icon size={13} color="var(--color-gold)" />
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-ui)",
                      letterSpacing: "var(--tracking-wide)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div
              className="flex items-center flex-wrap"
              style={{ gap: "var(--space-4)", marginBottom: "var(--space-6)" }}
            >
              {SOCIALS.map(({ Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--surface-elevated)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    transition:
                      "border-color var(--transition-fast), color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.background = `${color}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background =
                      "var(--surface-elevated)";
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>

            {/* Cities */}
            <div>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-widest)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-ui)",
                  marginBottom: "var(--space-3)",
                }}
              >
                We operate in
              </p>
              <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
                {CITIES.map((city) => (
                  <Link
                    key={city}
                    href={`/projects?city=${city}`}
                    style={{
                      padding: "var(--space-1) var(--space-3)",
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--text-xs)",
                      fontFamily: "var(--font-ui)",
                      border: "none",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wider)",
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-ui)",
                  marginBottom: "var(--space-5)",
                  fontWeight: "var(--weight-medium)",
                }}
              >
                {col.title}
              </p>
              <nav className="stack-sm">
                {col.items.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="group flex items-center gap-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    <ChevronRight
                      size={12}
                      style={{
                        color: "var(--color-gold)",
                        opacity: 0,
                        transform: "translateX(-4px)",
                        transition: "opacity 0.2s, transform 0.2s",
                        flexShrink: 0,
                      }}
                      className="footer-arrow"
                    />
                    <span style={{ position: "relative" }}>
                      {label}
                      <span
                        style={{
                          position: "absolute",
                          bottom: -1,
                          left: 0,
                          width: 0,
                          height: "1px",
                          background: "var(--color-gold)",
                          transition: "width var(--transition-fast)",
                        }}
                        className="footer-underline"
                      />
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          ))}

          {/* Newsletter + Contact */}
          <motion.div variants={fadeUp} style={{ minWidth: 220 }}>
            <Newsletter />

            {/* Contact info */}
            <div
              style={{
                marginTop: "var(--space-10)",
                paddingTop: "var(--space-6)",
                borderTop: "1px solid var(--border-subtle)",
              }}
              className="stack-sm"
            >
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wider)",
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-ui)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Get In Touch
              </p>
              {[
                {
                  Icon: Phone,
                  text: SITE_CONFIG.phoneDisplay,
                  href: SITE_CONFIG.phoneHref,
                },
                {
                  Icon: Mail,
                  text: SITE_CONFIG.email,
                  href: SITE_CONFIG.emailHref,
                },
                { Icon: MapPin, text: SITE_CONFIG.addressInline, href: "#" },
              ].map(({ Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    fontSize: "var(--text-sm)",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <Icon
                    size={13}
                    color="var(--color-gold)"
                    style={{ flexShrink: 0 }}
                  />
                  {text}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          data-footer-bottom
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-3)",
            paddingTop: "var(--space-6)",
            marginTop: "var(--space-14)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            All rights reserved. Copyright {SITE_CONFIG.rightsYear} by {SITE_CONFIG.brandName}
          </p>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            Powered and secured by Kommu Tech &amp; Marketing Pvt.Ltd
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes footer-spin { to { transform: rotate(360deg); } }

        /* Link hover effects via JS above — these reinforce the CSS layer */
        footer a:hover .footer-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        footer a:hover .footer-underline {
          width: 100% !important;
        }
      `}</style>
    </footer>
  );
}


