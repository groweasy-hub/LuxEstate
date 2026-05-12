'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Users, Eye, ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const BADGE_STYLES = {
  gold: 'badge-gold',
  red: 'badge-red',
  green: 'badge-green',
};

export default function OfferCard({ offer, index, onClaim }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group"
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -8,
        boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', height: 240, overflow: 'hidden', background: '#0a0a0a', flexShrink: 0 }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: offer.img ? `url(${offer.img})` : undefined,
            background: offer.img ? undefined : 'linear-gradient(135deg,#1a1208,#2a1f0a)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.button
            onClick={() => onClaim(offer)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
            transition={{ delay: 0.08, duration: 0.3 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              background: 'rgba(201,168,76,0.95)',
              color: 'var(--color-black)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
            }}
          >
            <Eye size={14} /> Claim Deal
          </motion.button>
        </motion.div>

        {/* Badge top-left */}
        <motion.span
          className={`badge ${BADGE_STYLES[offer.badgeType]} absolute top-4 left-4 animate-gold-glow`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        >
          {offer.badge}
        </motion.span>

        {/* Tag top-right */}
        <motion.span
          className="badge absolute top-4 right-4"
          style={{
            background: 'rgba(8,8,8,0.75)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(4px)',
          }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
        >
          {offer.tag}
        </motion.span>

        {/* Discount ribbon */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(90deg, rgba(201,168,76,0.92), rgba(232,201,106,0.92))',
            backdropFilter: 'blur(4px)',
            padding: 'var(--space-2) var(--space-5)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-semibold)',
            color: 'var(--color-black)', fontSize: 'var(--text-sm)',
            letterSpacing: 'var(--tracking-wide)',
          }}>
            {offer.discount}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(8,8,8,0.75)', fontWeight: 'var(--weight-medium)' }}>
            {offer.saving}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', flex: 1 }}>

        {/* Title + location */}
        <div>
          <h4 style={{
            fontSize: 'var(--text-xl)', lineHeight: 1.3, marginBottom: 'var(--space-2)',
            color: hovered ? 'var(--color-gold)' : 'var(--text-primary)',
            transition: 'color 0.3s ease',
          }}>
            {offer.title}
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <MapPin size={13} color="var(--color-gold)" style={{ flexShrink: 0 }} />
            <span className="small" style={{ color: 'var(--text-secondary)' }}>{offer.location}</span>
          </div>
        </div>

        {/* Features pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {(offer.features || []).map((f) => (
            <motion.span
              key={f}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid var(--border-subtle)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-ui)',
              }}
              whileHover={{ background: 'rgba(201,168,76,0.15)', borderColor: 'var(--border-gold)' }}
            >
              {f}
            </motion.span>
          ))}
        </div>

        {/* Offer highlight */}
        <div style={{
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(201,168,76,0.06)',
          border: '1px solid var(--border-gold)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Zap size={13} color="var(--color-gold)" style={{ flexShrink: 0 }} />
            <span className="small" style={{ color: 'var(--color-gold-light)' }}>{offer.offer}</span>
          </div>
        </div>

        {/* Price row */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <div>
            <StrikePrice price={offer.oldPrice} />
            <span className="text-gradient-gold font-display" style={{ fontSize: 'var(--text-2xl)', display: 'block', lineHeight: 1.1 }}>
              {offer.newPrice}
            </span>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
              <Users size={12} color="var(--color-accent-danger)" />
              <span className="small" style={{ color: 'var(--color-accent-danger)', whiteSpace: 'nowrap' }}>
                {offer.unitsLeft} left
              </span>
            </div>
            <CountdownTimer hours={offer.expiresHours} size="sm" />
          </div>
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => onClaim(offer)}
          className="btn btn-primary w-full hover-shine"
          whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-gold-md)' }}
          whileTap={{ scale: 0.97 }}
          style={{ position: 'relative', overflow: 'hidden', marginTop: 'auto' }}
        >
          Claim This Deal
          <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={14} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}

function StrikePrice({ price }) {
  return (
    <motion.span
      className="small"
      style={{ color: 'var(--text-muted)', display: 'block', position: 'relative', width: 'fit-content', marginBottom: 2 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {price}
      <motion.span
        style={{
          position: 'absolute', top: '50%', left: 0,
          height: 1, background: 'var(--color-accent-danger)',
        }}
        variants={{ hidden: { width: 0 }, visible: { width: '100%' } }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.span>
  );
}
