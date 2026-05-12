'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Zap, ArrowRight, Users } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function FeaturedOffer({ offer, onClaim }) {
  if (!offer) return null;

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--border-gold)',
        background: 'var(--surface-card)',
        boxShadow: 'var(--shadow-gold-md)',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gold glow bg */}
      <div
        className="bg-gold-pulse absolute"
        style={{ width: 500, height: 500, top: '50%', right: -100, transform: 'translateY(-50%)', pointerEvents: 'none' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 420 }}>
        {/* Image side */}
        <div className="hover-zoom relative overflow-hidden" style={{ borderRadius: 'var(--radius-2xl) 0 0 var(--radius-2xl)' }}>
          <img
            src={offer.img}
            alt={offer.title}
            style={{
              width: '100%', height: '100%', minHeight: 420,
              objectFit: 'cover', objectPosition: 'center',
              display: 'block',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 60%, var(--surface-card) 100%)' }} />
          <span className="badge badge-gold animate-gold-glow absolute top-4 left-4" style={{ fontSize: 'var(--text-sm)' }}>
            ⭐ Featured Deal
          </span>
        </div>

        {/* Content side */}
        <div style={{ padding: 'var(--space-10)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-5)' }}>

          {/* Title + location */}
          <div>
            <span className="badge badge-red animate-pulse-scale" style={{ marginBottom: 'var(--space-3)', display: 'inline-flex' }}>
              🔥 {offer.tag} — Ends Soon
            </span>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>{offer.title}</h2>
            {/* MapPin vertically centered with text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <MapPin size={14} color="var(--color-gold)" style={{ flexShrink: 0, display: 'block' }} />
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1 }}>{offer.location}</span>
            </div>
          </div>

          {/* Price */}
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', textDecoration: 'line-through', display: 'block', marginBottom: 'var(--space-1)' }}>
              {offer.oldPrice}
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-3)' }}>
              <span className="text-gradient-gold font-display" style={{ fontSize: 'var(--text-5xl)', lineHeight: 1 }}>
                {offer.newPrice}
              </span>
              {/* Discount — no border */}
              <span
                style={{
                  marginBottom: 6,
                  padding: '2px var(--space-2)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(74,222,128,0.12)',
                  color: '#4ade80',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 'var(--weight-medium)',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {offer.discount}
              </span>
            </div>
            <span style={{ color: '#4ade80', fontSize: 'var(--text-sm)' }}>{offer.saving}</span>
          </div>

          {/* Offer detail */}
          <div
            style={{
              padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
              background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border-gold)',
            }}
          >
            {/* Zap icon inline beside label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <Zap size={14} color="var(--color-gold)" style={{ flexShrink: 0, display: 'block' }} />
              <span className="small" style={{ color: 'var(--color-gold-light)', fontWeight: 'var(--weight-medium)', lineHeight: 1 }}>
                Exclusive Offer
              </span>
            </div>
            <p className="small" style={{ color: 'var(--text-secondary)', margin: 0 }}>{offer.offer}</p>
          </div>

          {/* Urgency — units left + timer stacked, icon centered */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Users size={14} color="var(--color-accent-danger)" style={{ flexShrink: 0, display: 'block' }} />
              <span className="small" style={{ color: 'var(--color-accent-danger)', lineHeight: 1 }}>
                Only {offer.unitsLeft} units left
              </span>
            </div>
            <CountdownTimer hours={offer.expiresHours} size="sm" />
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <motion.button
              onClick={() => onClaim(offer)}
              className="btn btn-primary btn-lg animate-gold-glow"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Claim This Deal
            </motion.button>
            <Link href={`/projects/${offer.projectId}`} className="btn btn-secondary btn-lg hover-nudge-right">
              View Project <ArrowRight size={14} className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
