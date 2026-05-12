"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Award,
  Users,
  Clock,
  TrendingUp,
  Shield,
  Star,
  ArrowRight,
  Phone,
  Link2,
  AtSign,
  Share2,
} from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

/* ── DATA ─────────────────────────────────────────────────── */

const COUNTERS = [
  { icon: Award, value: 200, suffix: "+", label: "Projects Delivered" },
  { icon: TrendingUp, value: 50, suffix: "Cr+", label: "Deals Closed (₹)" },
  { icon: Clock, value: 10, suffix: "+", label: "Years of Excellence" },
  { icon: Users, value: 5000, suffix: "+", label: "Happy Families" },
];

const TIMELINE = [
  {
    year: "2014",
    title: "Founded",
    desc: "LuxEstate was born with a single mission — make luxury real estate accessible and transparent for every buyer.",
  },
  {
    year: "2016",
    title: "First 100 Deals",
    desc: "Crossed 100 successful property transactions within 2 years, earning our first industry recognition.",
  },
  {
    year: "2018",
    title: "RERA Certified",
    desc: "Became one of the first channel partners in Mumbai to achieve full RERA certification across all listings.",
  },
  {
    year: "2020",
    title: "Digital Expansion",
    desc: "Launched our digital platform, enabling clients to discover, compare, and book properties entirely online.",
  },
  {
    year: "2022",
    title: "Award Winning",
    desc: 'Recognised as "Best Luxury Channel Partner" at the National Real Estate Awards for 2 consecutive years.',
  },
  {
    year: "2024",
    title: "Pan-India Presence",
    desc: "Expanded to 8 cities with 200+ premium projects and a team of 50+ dedicated property experts.",
  },
];

const TEAM = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    img: "/images/Arjun-Mehta.jpg",
    bio: "15+ years in luxury real estate. Former VP at Lodha Group. Passionate about connecting families with their dream homes.",
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Priya Sharma",
    role: "Head of Sales",
    img: "/images/Priya-Sharma.jpg",
    bio: "Closed ₹200Cr+ in transactions. Expert in ultra-luxury segment. Known for her client-first approach.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Rohan Kapoor",
    role: "Lead Property Advisor",
    img: "/images/Rohan-Kapoor.jpg",
    bio: "Specialist in Bandra, Worli & Juhu micro-markets. Helped 500+ families find their perfect home.",
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Sneha Patel",
    role: "Client Relations Manager",
    img: "/images/Sneha-Patel.jpg",
    bio: "Ensures every client journey is seamless from first enquiry to final handover. 98% satisfaction rate.",
    socials: { linkedin: "#", twitter: "#" },
  },
];

/* ── COUNTER ──────────────────────────────────────────────── */

function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.ceil(target / (1600 / 16));
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) {
        setCount(target);
        clearInterval(id);
      } else setCount(cur);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

/* ── PAGE ─────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <HeroSection />
      <CountersSection />
      <StorySection />
      <TimelineSection />
      <TeamSection />
      <FinalCTA />
    </motion.div>
  );
}

/* ── 1. HERO ──────────────────────────────────────────────── */

const WORDS = ["Building", "Dreams,", "Delivering", "Homes."];

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: 600 }}
    >
      {/* Parallax bg */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          scale: 1.12,
          backgroundImage: "url(/images/project-3.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.45) 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-animated"
        style={{ opacity: 0.35 }}
      />
      <div
        className="bg-gold-pulse absolute"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          opacity: 0.5,
        }}
      />

      <motion.div
        className="relative container h-full"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "var(--nav-height)",
          y: contentY,
          opacity,
        }}
      >
        <motion.div
          className="section-label mb-6"
          style={{ justifyContent: "center" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span>Our Story</span>
        </motion.div>

        {/* Word-by-word headline */}
        <h1 style={{ overflow: "hidden", marginBottom: 0 }}>
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              style={{
                display: "inline-block",
                marginRight: "0.28em",
                color: i % 2 === 1 ? "transparent" : "var(--text-primary)",
                backgroundImage:
                  i % 2 === 1 ? "var(--gradient-text-gold)" : "none",
                WebkitBackgroundClip: i % 2 === 1 ? "text" : "unset",
                backgroundClip: i % 2 === 1 ? "text" : "unset",
                WebkitTextFillColor: i % 2 === 1 ? "transparent" : "unset",
              }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="lead mt-5"
          style={{ maxWidth: 520, margin: "var(--space-5) auto 0" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.55 }}
        >
          A decade of trust, transparency, and transforming the way India buys
          luxury real estate.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ── 2. COUNTERS ──────────────────────────────────────────── */

function CountersSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    // Fallback: force visible after 1s in case observer doesn't fire
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      style={{
        background: "var(--surface-base)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container section-sm">
        <div
          ref={ref}
          data-stagger
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {COUNTERS.map(({ icon: Icon, value, suffix, label }) => (
            <motion.div
              key={label}
              className="card text-center hover-lift-gold"
              style={{ padding: "var(--space-8)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-center mb-4">
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "var(--radius-md)",
                    background: "var(--surface-hover)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={24} color="var(--color-gold)" />
                </div>
              </div>
              <div
                className="text-gradient-gold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-4xl)",
                  fontWeight: "var(--weight-light)",
                  lineHeight: 1,
                  marginBottom: "var(--space-2)",
                }}
              >
                <Counter target={value} suffix={suffix} inView={visible} />
              </div>
              <p className="small">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. STORY ─────────────────────────────────────────────── */

function StorySection() {
  const ref = useInViewAnimation();

  return (
    <section className="section" style={{ background: "var(--surface-page)" }}>
      <div className="container">
        <div
          ref={ref}
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-16)",
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Image — slides from left */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                height: 480,
                borderRadius: "var(--radius-2xl)",
                backgroundImage: "url(/images/Our-Story.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "1px solid var(--border-subtle)",
              }}
            />
            {/* Floating badge */}
            <motion.div
              className="absolute glass-gold"
              style={{
                bottom: -24,
                right: -24,
                padding: "var(--space-5)",
                borderRadius: "var(--radius-xl)",
                minWidth: 160,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Star
                  size={14}
                  color="var(--color-gold)"
                  fill="var(--color-gold)"
                />
                <span
                  className="overline"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Rated
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-2xl)",
                  color: "var(--color-gold)",
                  lineHeight: 1,
                }}
              >
                4.9 / 5
              </p>
              <p className="small">by 500+ clients</p>
            </motion.div>
          </motion.div>

          {/* Text — slides from right */}
          <motion.div
            className="stack"
            initial={{ opacity: 0, x: 56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">
              <span>Our Story</span>
            </div>
            <h2>A Decade of Turning Aspirations Into Addresses</h2>
            <p className="lead">
              LuxEstate was founded in 2014 with a simple belief — every family
              deserves honest guidance when making the most important financial
              decision of their lives.
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              We started as a two-person team in a small Bandra office. Today,
              we're a 50-member strong team that has helped over 5,000 families
              find their dream homes across Mumbai, Pune, and beyond.
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              Our edge? We never push a property. We listen first, understand
              your life goals, and then match you with the right home — at the
              right price, at the right time.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                "RERA Certified",
                "Zero Brokerage",
                "Award Winning",
                "Pan-India",
              ].map((tag) => (
                <span key={tag} className="badge badge-gold" style={{ marginBottom: "var(--space-1)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. TIMELINE ──────────────────────────────────────────── */

function TimelineSection() {
  return (
    <section className="section" style={{ background: "var(--surface-base)" }}>
      <div className="container">
        <div
          data-reveal
          style={{ textAlign: "center", marginBottom: "var(--space-16)" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span>Our Journey</span>
          </div>
          <h2>A Decade of Milestones</h2>
        </div>

        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          {/* Centre line */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--border-gold)",
              transform: "translateX(-50%)",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.year}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 48px 1fr",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-10)",
                  alignItems: "center",
                }}
                initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left slot */}
                {isLeft ? <TimelineCard item={item} align="right" /> : <div />}

                {/* Centre dot */}
                <div className="flex-center">
                  <motion.div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "var(--gradient-gold)",
                      border: "3px solid var(--surface-base)",
                      boxShadow: "var(--shadow-gold-sm)",
                      flexShrink: 0,
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                  />
                </div>

                {/* Right slot */}
                {!isLeft ? <TimelineCard item={item} align="left" /> : <div />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, align }) {
  return (
    <div
      className="card hover-lift-gold"
      style={{ textAlign: align, padding: "var(--space-5)" }}
    >
      <span
        className="text-gradient-gold font-display"
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: "var(--weight-light)",
          display: "block",
          marginBottom: "var(--space-1)",
        }}
      >
        {item.year}
      </span>
      <h5 style={{ marginBottom: "var(--space-2)" }}>{item.title}</h5>
      <p className="small" style={{ lineHeight: "var(--leading-relaxed)" }}>
        {item.desc}
      </p>
    </div>
  );
}

/* ── 5. TEAM ──────────────────────────────────────────────── */

function TeamSection() {
  const ref = useInViewAnimation();

  return (
    <section className="section" style={{ background: "var(--surface-page)" }}>
      <div className="container">
        <div
          ref={ref}
          data-reveal
          className="text-center"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span>The People Behind LuxEstate</span>
          </div>
          <h2>Meet Our Team</h2>
          <p className="lead mt-3 mx-auto" style={{ maxWidth: 480 }}>
            Experienced advisors who put your interests first — every single
            time.
          </p>
        </div>

        <div
          data-stagger
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="card overflow-hidden group"
      style={{ padding: 0, cursor: "default" }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.1,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, boxShadow: "var(--shadow-card-hover)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: 260 }}>
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: member.img ? `url(${member.img})` : "linear-gradient(135deg,#1a1208,#2a1f0a)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Bio overlay — slides up on hover */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end"
          style={{
            background:
              "linear-gradient(0deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 60%, transparent 100%)",
            padding: "var(--space-4)",
          }}
          initial={false}
        >
          <motion.p
            className="small"
            style={{
              color: "var(--text-secondary)",
              lineHeight: "var(--leading-relaxed)",
            }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {member.bio}
          </motion.p>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: "var(--space-4)" }}>
        <h5 style={{ marginBottom: "var(--space-1)" }}>{member.name}</h5>
        <p
          className="small"
          style={{ color: "var(--color-gold)", marginBottom: "var(--space-3)" }}
        >
          {member.role}
        </p>
        <div className="flex gap-2">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              className="btn btn-icon btn-ghost hover-scale"
              style={{ padding: "var(--space-2)" }}
              aria-label="LinkedIn"
            >
              <Link2 size={14} />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              className="btn btn-icon btn-ghost hover-scale"
              style={{ padding: "var(--space-2)" }}
              aria-label="Instagram"
            >
              <AtSign size={14} />
            </a>
          )}
          {member.socials.twitter && (
            <a
              href={member.socials.twitter}
              className="btn btn-icon btn-ghost hover-scale"
              style={{ padding: "var(--space-2)" }}
              aria-label="Twitter"
            >
              <Share2 size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── 6. FINAL CTA ─────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section
      className="section"
      style={{
        background: "var(--surface-base)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container">
        <motion.div
          className="text-center"
          style={{ maxWidth: 600, margin: "0 auto" }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span>Let's Connect</span>
          </div>
          <h2 style={{ marginBottom: "var(--space-4)" }}>
            Let's Help You Find Your{" "}
            <em className="text-gradient-gold font-display">Dream Home</em>
          </h2>
          <p className="lead" style={{ marginBottom: "var(--space-10)" }}>
            Whether you're a first-time buyer or a seasoned investor, our team
            is ready to guide you every step of the way.
          </p>
          <div className="flex-center gap-4 flex-wrap">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link
                href="/contact"
                className="btn btn-primary btn-lg animate-gold-glow hover-nudge-right"
              >
                Get Free Consultation <ArrowRight size={16} className="icon" />
              </Link>
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <a
                href="tel:+919999999999"
                className="btn btn-secondary btn-lg flex items-center gap-2"
              >
                <Phone size={15} /> Call Us Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
