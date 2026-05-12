"use client";
import { useState } from "react";

const offers = [
  "🏠 Zero Brokerage on Select Projects",
  "💰 Home Loan at 8.4% p.a.",
  "🎁 Free Interior Consultation Worth ₹50,000",
  "⚡ Limited Time: 5% Early Bird Discount",
  "🏢 Pre-Launch Prices on New Launches",
  "📋 RERA Verified Projects Only",
  "🎯 Assured Returns on Select Plots",
  "🚗 Free Site Visit with Cab Pickup",
];

// Triple for seamless infinite loop
const track = [...offers, ...offers, ...offers];

export default function OffersSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "var(--color-gold)",
        overflow: "hidden",
        padding: "var(--space-4) 0",
        position: "relative",
      }}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 80,
          background:
            "linear-gradient(to right, var(--color-gold), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 80,
          background:
            "linear-gradient(to left, var(--color-gold), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          gap: 0,
          animation: "offerScroll 32s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((label, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-6)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              color: "rgba(8,8,8,0.85)",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)",
              letterSpacing: "0.04em",
              padding: "0 var(--space-8)",
            }}
          >
            {label}
            {/* Dot separator */}
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "rgba(8,8,8,0.3)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes offerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
      `}</style>
    </section>
  );
}
