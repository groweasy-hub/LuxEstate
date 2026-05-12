"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

// ── Floating label input ──────────────────────────────────────
function FloatingField({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  as = "input",
  rows,
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const Tag = as;

  return (
    <div className="relative" style={{ marginBottom: "var(--space-6)" }}>
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        className={`form-input${as === "textarea" ? " form-textarea" : ""}${error ? " error animate-shake" : ""}`}
        style={{
          paddingTop: as === "textarea" ? "var(--space-6)" : "var(--space-6)",
          paddingBottom: as === "textarea" ? "var(--space-3)" : undefined,
          resize: as === "textarea" ? "none" : undefined,
          boxShadow: focused ? "0 0 0 3px rgba(201,168,76,0.15)" : undefined,
          borderColor: focused
            ? "var(--border-focus)"
            : error
              ? "var(--color-accent-danger)"
              : undefined,
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
      {/* Floating label */}
      <label
        style={{
          position: "absolute",
          left: "var(--space-4)",
          top: lifted ? 6 : "50%",
          transform:
            as === "textarea"
              ? lifted
                ? "none"
                : "translateY(calc(var(--space-4)))"
              : lifted
                ? "none"
                : "translateY(-50%)",
          fontSize: lifted ? "var(--text-xs)" : "var(--text-base)",
          color: focused ? "var(--color-gold)" : "var(--text-muted)",
          pointerEvents: "none",
          transition: "all 0.2s var(--ease-out-expo)",
          letterSpacing: lifted ? "var(--tracking-wide)" : "normal",
          textTransform: lifted ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
      {error && (
        <motion.span
          className="form-error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: "var(--space-1)", display: "block" }}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────
function ContactForm() {
  const { form, errors, status, handleChange, handleSubmit } = useLeadForm();
  const ref = useInViewAnimation();

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center gap-5 py-16 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle
            cx="36"
            cy="36"
            r="34"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            opacity="0.3"
          />
          <circle
            cx="36"
            cy="36"
            r="26"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
          />
          <path
            className="checkmark-draw"
            d="M22 36l10 10 18-18"
            stroke="var(--color-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ "--stroke-length": 60 }}
          />
        </svg>
        <h3>Message Sent!</h3>
        <p className="lead" style={{ maxWidth: 320 }}>
          Our team will reach out within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      ref={ref}
      onSubmit={handleSubmit}
      data-reveal
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 var(--space-4)",
        }}
      >
        <div style={{ gridColumn: "1" }}>
          <FloatingField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>
        <div style={{ gridColumn: "2" }}>
          <FloatingField
            name="phone"
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>
      </div>
      <FloatingField
        name="email"
        label="Email Address"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FloatingField
        name="message"
        label="Your Message"
        as="textarea"
        rows={5}
        value={form.message}
        onChange={handleChange}
        error={errors.message}
      />

      <motion.button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary btn-lg w-full animate-gold-glow"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === "loading" ? (
          <span className="flex items-center gap-3">
            <span className="spinner" /> Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </motion.button>
    </motion.form>
  );
}

// ── Contact Info Card ─────────────────────────────────────────
const contactItems = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 99999 99999",
    href: "tel:+919999999999",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@luxestate.in",
    href: "mailto:hello@luxestate.in",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Bandra West, Mumbai 400050",
    href: "#map",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Sat: 9am – 7pm",
    href: null,
  },
];

// ── Page ──────────────────────────────────────────────────────
export default function ContactPage() {
  const mapRef = useInViewAnimation();

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-center overflow-hidden"
        style={{
          minHeight: "40vh",
          paddingTop: "calc(var(--nav-height) + var(--space-16))",
          paddingBottom: "var(--space-16)",
          background: "var(--surface-page)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-animated"
          style={{ opacity: 0.6, zIndex: 0 }}
        />
        <div
          className="bg-gold-pulse absolute"
          style={{
            width: 700,
            height: 700,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 0,
          }}
        />
        <div
          className="absolute inset-0 bg-grid"
          style={{ opacity: 0.3, zIndex: 0 }}
        />
        <div className="container relative text-center" style={{ zIndex: 1 }}>
          <motion.div
            className="section-label"
            style={{ justifyContent: "center" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>Get In Touch</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="lead mx-auto mt-4"
            style={{ maxWidth: 480 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Have a question or ready to find your dream home? We're here to
            help.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT INFO + FORM ── */}
      <section
        className="section"
        style={{ background: "var(--surface-page)" }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-12)",
            alignItems: "start",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="mb-3">Let's Talk</h2>
              <p className="lead mb-10">
                Reach out through any channel — we respond within hours.
              </p>
            </motion.div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              {contactItems.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  className="card hover-lift-gold"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                    padding: "var(--space-5)",
                  }}
                  initial={{ opacity: 0, x: -24, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      background: "var(--surface-hover)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon size={20} color="var(--color-gold)" />
                  </motion.div>
                  <div>
                    <p className="overline" style={{ marginBottom: 2 }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="hover-gold"
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "var(--text-base)",
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "var(--text-base)",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg w-full"
              style={{
                marginTop: "var(--space-8)",
                background: "#25D366",
                color: "#fff",
                border: "none",
                gap: "var(--space-3)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 24px rgba(37,211,102,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </motion.a>
          </div>

          {/* Form */}
          <div
            className="card"
            style={{ padding: "var(--space-5)", marginTop: "var(--space-20)" }}
          >
            <h3 style={{ marginBottom: "var(--space-10)" }}>Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section
        id="map"
        className="section-sm"
        style={{
          background: "var(--surface-base)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container">
          <motion.div
            ref={mapRef}
            data-reveal
            className="overflow-hidden"
            style={{
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)",
              height: 420,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8296!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNDknNDYuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LuxEstate Office Location"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
