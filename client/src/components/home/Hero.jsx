"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Search, MapPin, ChevronDown, Sparkles } from "lucide-react";

const HEADLINE_LINES = ["Find Your", "Dream Home"];
const LOCATION_SUGGESTIONS = [
  "Banjara Hills, Hyderabad",
  "Jubilee Hills, Hyderabad",
  "Gachibowli, Hyderabad",
  "HITEC City, Hyderabad",
  "Kondapur, Hyderabad",
];

export default function Hero() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasLoaded, setHasLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], ["0%", "8%"]);

  // Mouse parallax
  useEffect(() => {
    setHasLoaded(true);
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 24,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        minHeight: 640,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* ── Parallax Background Image ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10%",
          zIndex: 0,
          y: bgY,
          scale: bgScale,
          x: mousePos.x * 0.4,
          backgroundImage: "url(/images/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      {/* ── Multi-layer gradient overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              to top,
              rgba(6,6,6,0.96) 0%,
              rgba(6,6,6,0.65) 40%,
              rgba(6,6,6,0.25) 70%,
              rgba(6,6,6,0.10) 100%
            )
          `,
        }}
      />

      {/* ── Animated gradient atmosphere ── */}
      <div
        className="bg-gradient-animated"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.3,
          mixBlendMode: "screen",
        }}
      />

      {/* ── Gold orb accent ── */}
      <motion.div
        className="bg-gold-pulse"
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          top: "25%",
          left: "68%",
          transform: "translate(-50%,-50%)",
          zIndex: 1,
          opacity: 0.35,
          x: mousePos.x * -0.15,
          y: mousePos.y * -0.1,
        }}
      />

      {/* ── Secondary subtle orb bottom-left ── */}
      <motion.div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          bottom: "5%",
          left: "-5%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,140,60,0.12) 0%, transparent 70%)",
          zIndex: 1,
          x: mousePos.x * 0.08,
          y: mousePos.y * 0.08,
        }}
      />

      {/* ── HERO CONTENT ── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          opacity: contentOpacity,
          y: contentY,
          paddingBottom: "var(--space-20, 5rem)",
          paddingTop: "var(--nav-height, 80px)",
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-xl, 1280px)",
            margin: "0 auto",
            padding: "0 var(--space-8, 2rem)",
          }}
        >
          {/* Eyebrow / Label */}
          <motion.div
            className="section-label"
            style={{ marginBottom: "var(--space-5, 1.25rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles
              size={12}
              color="var(--color-gold, #C9A84C)"
              style={{ display: "block", flexShrink: 0 }}
            />
            <span>Premium Real Estate · Hyderabad</span>
          </motion.div>

          {/* ── Animated Headline ── */}
          <div
            style={{
              overflow: "visible",
              marginBottom: "var(--space-8, 2rem)",
            }}
          >
            {HEADLINE_LINES.map((line, lineIdx) => (
              <div
                key={lineIdx}
                style={{ overflow: "hidden", lineHeight: 1.05 }}
              >
                {line.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(3rem, 8vw, 6.5rem)",
                      fontWeight: "var(--weight-light, 300)",
                      letterSpacing: "var(--tracking-tight, -0.03em)",
                      lineHeight: 1.05,
                      color: "var(--text-primary, #F5F0E8)",
                      ...(char === " " ? { width: "0.28em" } : {}),
                    }}
                    initial={{ y: "115%", opacity: 0 }}
                    animate={hasLoaded ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      delay: 0.45 + lineIdx * 0.18 + charIdx * 0.028,
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          {/* ── Description + Search Bar ── */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--space-8, 2rem)",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 1.05,
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Description */}
            <p
              className="lead"
              style={{
                maxWidth: 460,
                flexShrink: 0,
                margin: 0,
                lineHeight: 1.65,
                color: "var(--text-secondary, rgba(245,240,232,0.72))",
              }}
            >
              Discover luxury properties curated for the discerning buyer.
              <br />
              Your perfect home awaits.
            </p>

            {/* Search Bar */}
            <motion.div
              style={{ flex: 1, minWidth: 280 }}
              initial={{ opacity: 0, x: 28 }}
              animate={hasLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 1.25,
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
            >
              <SearchBar />
            </motion.div>
          </motion.div>

          {/* ── Trust badges ── */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-6, 1.5rem)",
              marginTop: "var(--space-8, 2rem)",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0 }}
            animate={hasLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            {["200+ Projects", "5000+ Families", "RERA Verified"].map(
              (badge, i) => (
                <div
                  key={badge}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2, 0.5rem)",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--color-gold, #C9A84C)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="overline"
                    style={{
                      fontSize: "var(--text-xs, 0.7rem)",
                      color: "var(--text-muted, rgba(245,240,232,0.45))",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {badge}
                  </span>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "var(--space-8, 2rem)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-2, 0.5rem)",
          zIndex: 10,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span
          className="overline"
          style={{
            fontSize: "var(--text-xs, 0.68rem)",
            color: "var(--text-muted, rgba(245,240,232,0.4))",
            letterSpacing: "0.14em",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown
            size={15}
            color="var(--color-gold, #C9A84C)"
            style={{ display: "block" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SearchBar sub-component
───────────────────────────────────────── */
function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = LOCATION_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (val) => {
    setQuery(val);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Input row */}
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(12,12,12,0.88)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: `1px solid ${
            focused
              ? "var(--border-gold, rgba(201,168,76,0.6))"
              : "var(--border-default, rgba(255,255,255,0.1))"
          }`,
          boxShadow: focused
            ? "0 0 0 3px rgba(201,168,76,0.12), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(0,0,0,0.35)",
          borderRadius: "var(--radius-lg, 12px)",
          overflow: "hidden",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
        animate={{ scale: focused ? 1.01 : 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Location icon */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "var(--space-4, 1rem)",
            flexShrink: 0,
          }}
        >
          <MapPin
            size={18}
            style={{
              color: "var(--color-gold, #C9A84C)",
              display: "block",
              transition: "transform 0.2s",
              transform: focused ? "scale(1.1)" : "scale(1)",
            }}
          />
        </span>

        {/* Text input */}
        <input
          type="text"
          value={query}
          placeholder="Search by location, project or builder..."
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setFocused(false);
            setTimeout(() => setShowSuggestions(false), 160);
          }}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            padding: "var(--space-4, 1rem)",
            color: "var(--text-primary, #F5F0E8)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm, 0.875rem)",
            minWidth: 0,
          }}
        />

        {/* Search button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2, 0.5rem)",
            flexShrink: 0,
            background:
              "var(--gradient-gold, linear-gradient(135deg, #C9A84C, #E8C96A))",
            color: "var(--color-black, #060606)",
            border: "none",
            padding: "var(--space-4, 1rem) var(--space-5, 1.25rem)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm, 0.875rem)",
            fontWeight: "var(--weight-semibold, 600)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <Search size={15} style={{ display: "block", flexShrink: 0 }} />
          <span>Search</span>
        </motion.button>
      </motion.div>

      {/* ── Suggestions Dropdown ── */}
      <AnimatePresence>
        {showSuggestions && filtered.length > 0 && query.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(12,12,12,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--border-default, rgba(255,255,255,0.1))",
              borderRadius: "var(--radius-md, 8px)",
              listStyle: "none",
              margin: 0,
              padding: "var(--space-2, 0.5rem) 0",
              zIndex: 100,
              overflow: "hidden",
            }}
          >
            {filtered.map((suggestion) => (
              <li
                key={suggestion}
                onMouseDown={() => handleSelect(suggestion)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3, 0.75rem)",
                  padding: "var(--space-3, 0.75rem) var(--space-4, 1rem)",
                  cursor: "pointer",
                  color: "var(--text-secondary, rgba(245,240,232,0.7))",
                  fontSize: "var(--text-sm, 0.875rem)",
                  fontFamily: "var(--font-body)",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                  e.currentTarget.style.color = "var(--color-gold, #C9A84C)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color =
                    "var(--text-secondary, rgba(245,240,232,0.7))";
                }}
              >
                <MapPin
                  size={13}
                  style={{ color: "var(--color-gold, #C9A84C)", flexShrink: 0 }}
                />
                {suggestion}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
