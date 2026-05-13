"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import CountdownTimer from "@/components/offers/CountdownTimer";
import OfferCard from "@/components/offers/OfferCard";
import OfferModal from "@/components/offers/OfferModal";
import FeaturedOffer from "@/components/offers/FeaturedOffer";
import UrgencyStrip from "@/components/offers/UrgencyStrip";

const HERO_WORDS = ["Exclusive", "Deals.", "Limited", "Time."];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export default function OffersPageClient({
  offers = [],
  featuredOffer = null,
}) {
  const [activeOffer, setActiveOffer] = useState(null);
  const heroOffer = featuredOffer || offers[0] || null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "calc(var(--nav-height) + var(--space-16))",
          paddingBottom: "var(--space-16)",
          background: "var(--surface-page)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-animated" style={{ opacity: 0.6, zIndex: 0 }} />
        <div
          className="bg-gold-pulse absolute"
          style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }}
        />
        <div className="absolute inset-0 bg-grid" style={{ opacity: 0.3, zIndex: 0 }} />

        <div className="container relative" style={{ zIndex: 1 }}>
          <div className="text-center" style={{ maxWidth: 760, margin: "0 auto" }}>
            <motion.div
              className="section-label"
              style={{ justifyContent: "center", marginBottom: "var(--space-6)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span>Limited Time Offers</span>
            </motion.div>

            <h1 style={{ marginBottom: "var(--space-6)", overflow: "hidden" }}>
              {HERO_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  style={{
                    display: "inline-block",
                    marginRight: "0.25em",
                    color: i % 2 === 1 ? "transparent" : "var(--text-primary)",
                    backgroundImage: i % 2 === 1 ? "var(--gradient-text-gold)" : "none",
                    WebkitBackgroundClip: i % 2 === 1 ? "text" : "unset",
                    backgroundClip: i % 2 === 1 ? "text" : "unset",
                    WebkitTextFillColor: i % 2 === 1 ? "transparent" : "unset",
                  }}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="lead"
              style={{ marginBottom: "var(--space-10)", color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              Hand-picked deals on premium properties available for a limited time only.
              Lock in your price before it is gone.
            </motion.p>

            <motion.div
              className="flex-center flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <p className="overline">Top offer expires in</p>
              <CountdownTimer hours={heroOffer?.expiresHours || 0} />
              {heroOffer && (
                <motion.button
                  onClick={() => setActiveOffer(heroOffer)}
                  className="btn btn-primary btn-lg animate-gold-glow"
                  style={{ marginTop: "var(--space-4)" }}
                  whileHover={{ scale: 1.05, boxShadow: "var(--shadow-gold-lg)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Sparkles size={16} /> View Best Deal Now
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <UrgencyStrip />

      {featuredOffer && (
        <section className="section" style={{ background: "var(--surface-base)", paddingBottom: "var(--space-12)" }}>
          <div className="container">
            <motion.div
              style={{ marginBottom: "var(--space-8)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-label"><span>Featured Deal</span></div>
              <h2>This Week&apos;s Top Offer</h2>
            </motion.div>
            <FeaturedOffer offer={featuredOffer} onClaim={setActiveOffer} />
          </div>
        </section>
      )}

      <section className="section" style={{ background: "var(--surface-page)" }}>
        <div className="container">
          <motion.div
            style={{ marginBottom: "var(--space-10)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label"><span>All Active Offers</span></div>
            <div className="flex-between flex-wrap gap-4" style={{ alignItems: "flex-end" }}>
              <h2 style={{ marginBottom: 0 }}>Current Deals</h2>
              <motion.span
                className="badge badge-red"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {offers.length} offers active
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "var(--space-6)",
              alignItems: "stretch",
            }}
          >
            {offers.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} index={i} onClaim={setActiveOffer} />
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="section"
        style={{ background: "var(--surface-base)", borderTop: "1px solid var(--border-subtle)" }}
      >
        <div className="container">
          <motion.div
            className="text-center"
            style={{ maxWidth: 640, margin: "0 auto" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label" style={{ justifyContent: "center" }}>
              <span>Do Not Miss Out</span>
            </div>
            <h2 style={{ marginBottom: "var(--space-4)" }}>
              Not Sure Which Deal Is{" "}
              <em className="text-gradient-gold font-display">Right for You?</em>
            </h2>
            <p className="lead" style={{ marginBottom: "var(--space-8)" }}>
              Our property experts will match you with the best offer based on your budget and requirements.
            </p>
            <div className="flex-center gap-4 flex-wrap" data-offers-final-buttons>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Link href="/contact" className="btn btn-primary btn-lg animate-gold-glow hover-nudge-right">
                  Talk to an Expert <ArrowRight size={16} className="icon" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a href="tel:+919999999999" className="btn btn-secondary btn-lg flex items-center gap-2">
                  <Phone size={15} /> Book Site Visit
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <OfferModal offer={activeOffer} onClose={() => setActiveOffer(null)} />
    </motion.div>
  );
}
