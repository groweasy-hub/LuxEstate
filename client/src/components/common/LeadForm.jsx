"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const FIELD_CONFIGS = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Your full name",
    icon: User,
    required: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+91 98765 43210",
    icon: Phone,
    required: true,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    icon: Mail,
    required: false,
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us about your requirements…",
    icon: MessageSquare,
    required: false,
  },
];

function InputField({
  field,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  error,
}) {
  const Icon = field.icon;
  const isActive = focused || value;

  return (
    <div style={{ position: "relative" }}>
      {/* Floating label */}
      <label
        htmlFor={field.id}
        style={{
          position: "absolute",
          left: 40,
          top: isActive ? -9 : field.type === "textarea" ? 14 : "50%",
          transform: isActive
            ? "none"
            : field.type === "textarea"
              ? "none"
              : "translateY(-50%)",
          fontSize: isActive ? "var(--text-xs)" : "var(--text-sm)",
          color: focused
            ? "var(--color-gold)"
            : error
              ? "var(--color-accent-danger)"
              : isActive
                ? "var(--text-muted)"
                : "var(--text-muted)",
          background: isActive ? "var(--surface-card)" : "transparent",
          padding: isActive ? "0 4px" : 0,
          transition: "all 0.2s var(--ease-out-expo)",
          pointerEvents: "none",
          zIndex: 1,
          fontFamily: "var(--font-ui)",
          letterSpacing: "var(--tracking-wide)",
        }}
      >
        {field.label}
        {field.required && (
          <span style={{ color: "var(--color-gold)", marginLeft: 2 }}>*</span>
        )}
      </label>

      {/* Icon */}
      <Icon
        size={15}
        style={{
          position: "absolute",
          left: 14,
          top: field.type === "textarea" ? 16 : "50%",
          transform: field.type === "textarea" ? "none" : "translateY(-50%)",
          color: focused ? "var(--color-gold)" : "var(--text-muted)",
          transition: "color var(--transition-fast)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Input / Textarea */}
      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={focused ? field.placeholder : ""}
          rows={3}
          style={{
            width: "100%",
            padding: "var(--space-3) var(--space-3) var(--space-3) 40px",
            background: "var(--surface-elevated)",
            border: `1px solid ${
              error
                ? "var(--color-accent-danger)"
                : focused
                  ? "var(--border-gold-strong)"
                  : "var(--border-default)"
            }`,
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-body)",
            resize: "none",
            outline: "none",
            transition:
              "border-color var(--transition-fast), box-shadow var(--transition-fast)",
            boxShadow: focused ? "var(--shadow-gold-sm)" : "none",
          }}
        />
      ) : (
        <input
          id={field.id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={focused ? field.placeholder : ""}
          style={{
            width: "100%",
            padding: "var(--space-3) var(--space-3) var(--space-3) 40px",
            background: "var(--surface-elevated)",
            border: `1px solid ${
              error
                ? "var(--color-accent-danger)"
                : focused
                  ? "var(--border-gold-strong)"
                  : "var(--border-default)"
            }`,
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition:
              "border-color var(--transition-fast), box-shadow var(--transition-fast)",
            boxShadow: focused ? "var(--shadow-gold-sm)" : "none",
          }}
        />
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-accent-danger)",
              marginTop: 4,
              paddingLeft: 40,
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LeadForm({ onSuccess, compact = false }) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const validate = () => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[+\d\s\-()]{7,15}$/.test(values.phone.trim()))
      errs.phone = "Enter a valid phone number";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = "Enter a valid email";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");

    // Simulate API call — replace with your actual endpoint
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    onSuccess?.();
  };

  const fields = compact
    ? FIELD_CONFIGS.filter((f) => f.id !== "message")
    : FIELD_CONFIGS;

  if (status === "success") {
    return (
      <motion.div
        className="flex-center flex-col gap-4 text-center"
        style={{ padding: "var(--space-8) 0" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 280 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            damping: 18,
            stiffness: 300,
          }}
        >
          <CheckCircle2 size={48} color="var(--color-gold)" />
        </motion.div>
        <h4>We'll be in touch!</h4>
        <p
          className="small"
          style={{ color: "var(--text-secondary)", maxWidth: 260 }}
        >
          Our team will call you within 30 minutes during business hours.
        </p>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setStatus("idle");
            setValues({ name: "", phone: "", email: "", message: "" });
          }}
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <div className="stack" style={{ gap: "var(--space-4)" }}>
      {fields.map((field) => (
        <InputField
          key={field.id}
          field={field}
          value={values[field.id]}
          onChange={(v) => {
            setValues((prev) => ({ ...prev, [field.id]: v }));
            if (errors[field.id]) setErrors((e) => ({ ...e, [field.id]: "" }));
          }}
          focused={focused === field.id}
          onFocus={() => setFocused(field.id)}
          onBlur={() => setFocused(null)}
          error={errors[field.id]}
        />
      ))}

      <motion.button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="btn btn-primary w-full"
        style={{
          marginTop: "var(--space-2)",
          justifyContent: "center",
          gap: "var(--space-2)",
          position: "relative",
          overflow: "hidden",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === "loading" ? (
          <>
            <Loader2
              size={16}
              style={{ animation: "spin 1s linear infinite" }}
            />
            Sending…
          </>
        ) : (
          "Request a Callback"
        )}
      </motion.button>

      <p
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--text-muted)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        By submitting, you agree to our{" "}
        <a href="/privacy" style={{ color: "var(--color-gold)" }}>
          Privacy Policy
        </a>
        . No spam, ever.
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
