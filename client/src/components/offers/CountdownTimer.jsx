'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useCountdown(hours) {
  const total = hours * 3600;
  const [secs, setSecs] = useState(total);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return { h, m, s };
}

function FlipDigit({ value, label, small }) {
  const display = String(value).padStart(2, '0');
  return (
    <div style={{ textAlign: 'center', minWidth: small ? 44 : 64 }}>
      <div
        style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: small ? 'var(--space-2) var(--space-3)' : 'var(--space-3) var(--space-4)',
          marginBottom: 'var(--space-1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            className="font-display"
            style={{ fontSize: small ? 'var(--text-lg)' : 'var(--text-3xl)', color: 'var(--color-gold)', display: 'block', lineHeight: 1 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border-gold)', opacity: 0.3 }} />
      </div>
      <span className="overline" style={{ fontSize: 'var(--text-xs)' }}>{label}</span>
    </div>
  );
}

export default function CountdownTimer({ hours, size = 'lg' }) {
  const { h, m, s } = useCountdown(hours);
  const isSmall = size === 'sm';

  return (
    <div className="flex items-end gap-2">
      <FlipDigit value={h} label="HRS" small={isSmall} />
      <span
        className="font-display"
        style={{
          fontSize: isSmall ? 'var(--text-base)' : 'var(--text-3xl)',
          color: 'var(--color-gold)',
          marginBottom: isSmall ? 14 : 22,
          opacity: 0.7,
        }}
      >
        :
      </span>
      <FlipDigit value={m} label="MIN" small={isSmall} />
      <span
        className="font-display"
        style={{
          fontSize: isSmall ? 'var(--text-base)' : 'var(--text-3xl)',
          color: 'var(--color-gold)',
          marginBottom: isSmall ? 14 : 22,
          opacity: 0.7,
        }}
      >
        :
      </span>
      <FlipDigit value={s} label="SEC" small={isSmall} />
    </div>
  );
}
