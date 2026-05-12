'use client';
import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-modal flex-center flex-col gap-6"
      style={{ background: 'var(--surface-page)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="loading-line" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="overline text-gradient-gold" style={{ fontSize: 'var(--text-lg)' }}>
          Luxury Living
        </span>
      </motion.div>
      <div className="pulse-loader">
        <span /><span /><span />
      </div>
    </motion.div>
  );
}
