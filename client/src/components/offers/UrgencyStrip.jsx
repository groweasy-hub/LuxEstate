'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const STRIPS = [
  { icon: Flame,         text: 'Only 7 units left at pre-launch price — Azure Sky Towers' },
  { icon: Clock,         text: 'Offer expires in 11 hours — Azure Sky Towers 15% OFF' },
  { icon: AlertTriangle, text: 'Stamp duty waiver ends this month — act now' },
  { icon: TrendingUp,    text: '5 buyers enquired in the last hour' },
  { icon: Flame,         text: 'Pre-launch pricing closes at midnight tonight' },
  { icon: Clock,         text: 'Limited inventory — only 3 penthouses remaining' },
];

// Triple for seamless infinite loop
const track = [...STRIPS, ...STRIPS, ...STRIPS];

export default function UrgencyStrip() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: 'linear-gradient(90deg, #C9A84C 0%, #E8C96A 40%, #D4AF37 70%, #C9A84C 100%)',
        backgroundSize: '200% 100%',
        overflow: 'hidden',
        padding: 'var(--space-4) 0',
        position: 'relative',
      }}
    >
      {/* Left fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 80,
        background: 'linear-gradient(to right, #C9A84C, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 80,
        background: 'linear-gradient(to left, #C9A84C, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Scrolling track */}
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          alignItems: 'center',
          animation: 'offerScroll 36s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {track.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              padding: '0 var(--space-10)',
            }}
          >
            {/* Icon container */}
            <motion.span
              animate={{ scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: (i % STRIPS.length) * 0.4, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.15)',
                flexShrink: 0,
              }}
            >
              <Icon size={14} color="rgba(8,8,8,0.85)" />
            </motion.span>

            {/* Text */}
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-semibold)',
              color: 'rgba(8,8,8,0.85)',
              letterSpacing: '0.02em',
            }}>
              {text}
            </span>

            {/* Dot separator */}
            <span style={{
              display: 'inline-block',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'rgba(8,8,8,0.3)',
              flexShrink: 0,
              marginLeft: 'var(--space-2)',
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
