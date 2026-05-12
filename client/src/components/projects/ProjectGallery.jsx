'use client';
import { motion } from 'framer-motion';
import Gallery from './Gallery';

export default function ProjectGallery({ images = [], title = 'Project Gallery' }) {
  // Fallback placeholder images when none provided
  const imgs =
    images.length > 0
      ? images
      : [
          '/images/project-1.jpg',
          '/images/project-2.jpg',
          '/images/project-3.jpg',
        ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div className="section-label" style={{ marginBottom: 'var(--space-3)' }}>
          <span>Visual Tour</span>
        </div>
        <h2>{title}</h2>
      </div>

      {/* Gallery */}
      <Gallery imgs={imgs} title={title} />

      {/* Image count label */}
      <p
        className="small"
        style={{
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: 'var(--space-4)',
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wide)',
          textTransform: 'uppercase',
        }}
      >
        {imgs.length} photos · Click to view full screen
      </p>
    </motion.section>
  );
}
