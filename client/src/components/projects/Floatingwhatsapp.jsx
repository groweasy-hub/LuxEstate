"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const WOBBLE = {
  rotate: [0, -12, 12, -10, 10, -6, 6, 0],
  transition: { duration: 0.7, ease: "easeInOut" },
};

export default function FloatingWhatsApp({
  phone = "919999999999",
  message = "Hi, I'm interested in your properties. Can you help me?",
}) {
  const [wobble, setWobble] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  // Wobble every 8s
  useEffect(() => {
    const id = setInterval(() => {
      setWobble(true);
      setTimeout(() => setWobble(false), 800);
    }, 8000);

    // Show tooltip after 3s on first load
    const t = setTimeout(() => {
      setTooltip(true);
      setTimeout(() => setTooltip(false), 4000);
    }, 3000);

    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, []);

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "var(--space-8)",
        right: "var(--space-8)",
        zIndex: "var(--z-fab)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "var(--space-3)",
      }}
    >
      {/* Tooltip bubble */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-3) var(--space-4)",
              maxWidth: 220,
              boxShadow: "var(--shadow-xl)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setTooltip(false)}
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
              }}
            >
              <X size={12} />
            </button>
            <p
              className="small"
              style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}
            >
              💬 Chat with us on WhatsApp for instant assistance!
            </p>
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                right: 24,
                width: 12,
                height: 12,
                background: "var(--surface-card)",
                border: "1px solid var(--border-subtle)",
                borderTop: "none",
                borderLeft: "none",
                transform: "rotate(45deg)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        animate={wobble ? WOBBLE : {}}
        whileHover={{
          scale: 1.12,
          boxShadow:
            "0 0 0 8px rgba(37,211,102,0.15), 0 8px 32px rgba(37,211,102,0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <MessageCircle size={26} color="#fff" fill="#fff" />

        {/* Pulse ring */}
        <motion.span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid #25D366",
          }}
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.8, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.a>
    </div>
  );
}
