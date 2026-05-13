'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useLeadForm } from '@/hooks/useLeadForm';

function OfferLeadForm({ offer }) {
  const { form, errors, status, handleChange, handleSubmit } = useLeadForm({
    source: 'offer_claim',
    projectInterested: offer?.projectTitle || '',
    projectId: offer?.projectDbId || '',
    offerId: offer?.id || '',
    offerTitle: offer?.title || '',
    offerDiscount: offer?.discount || '',
    message: offer?.title ? `Interested in claiming deal: ${offer.title}` : '',
    imageUrl: offer?.img || '',
  });

  if (status === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center gap-4 py-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <motion.circle
            cx="32"
            cy="32"
            r="30"
            stroke="var(--color-gold)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.path
            d="M20 32l9 9 15-15"
            stroke="var(--color-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          />
        </svg>
        <h4>Deal Claimed!</h4>
        <p className="small">Our expert will call you within 30 minutes to confirm your booking.</p>
        <span className="badge badge-gold">{offer?.discount} locked in</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <p className="small" style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
        Fill in your details to lock this deal. Name and phone number are required so we can reach you.
      </p>
      {offer?.projectTitle && (
        <div className="card" style={{ padding: 'var(--space-4)', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border-gold)' }}>
          <p className="small" style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Project: <strong style={{ color: 'var(--text-primary)' }}>{offer.projectTitle}</strong>
          </p>
          <p className="small" style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>
            Offer: <strong style={{ color: 'var(--text-primary)' }}>{offer.title}</strong>
          </p>
        </div>
      )}
      {[
        { name: 'name', placeholder: 'Your Full Name', type: 'text' },
        { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
        { name: 'email', placeholder: 'Email (optional)', type: 'email' },
      ].map(({ name, placeholder, type }) => (
        <div key={name} className="form-group">
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`form-input${errors[name] ? ' error animate-shake' : ''}`}
          />
          {errors[name] && <span className="form-error">{errors[name]}</span>}
        </div>
      ))}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary btn-lg w-full animate-gold-glow"
      >
        {status === 'loading' ? <span className="spinner" /> : `Claim ${offer?.discount || 'Deal'} Now`}
      </button>
      <p className="small text-center" style={{ color: 'var(--text-muted)' }}>
        No spam. 100% confidential.
      </p>
    </form>
  );
}

export default function OfferModal({ offer, onClose }) {
  useEffect(() => {
    document.body.style.overflow = offer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [offer]);

  return (
    <AnimatePresence>
      {offer && (
        <>
          <motion.div
            className="fixed inset-0"
            style={{ zIndex: 'var(--z-overlay)', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex-center p-4"
            style={{ zIndex: 'var(--z-modal)', pointerEvents: 'none' }}
          >
            <motion.div
              className="relative w-full"
              style={{
                maxWidth: 520,
                background: 'var(--surface-modal)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-modal), var(--shadow-gold-md)',
                pointerEvents: 'auto',
                overflow: 'hidden',
              }}
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  padding: 'var(--space-6)',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
                  borderBottom: '1px solid var(--border-gold)',
                }}
              >
                <div className="flex-between mb-2">
                  <span className="badge badge-gold animate-gold-glow">{offer.badge}</span>
                  <button onClick={onClose} className="btn btn-icon btn-ghost" aria-label="Close">
                    <X size={16} />
                  </button>
                </div>
                <h3 style={{ marginBottom: 'var(--space-1)' }}>{offer.title}</h3>
                <p className="small" style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                  {offer.location}
                </p>
                {offer.projectTitle && (
                  <p className="small" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                    Selected project: {offer.projectTitle}
                  </p>
                )}
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', textDecoration: 'line-through' }}>
                      {offer.oldPrice}
                    </span>
                    <span
                      className="text-gradient-gold font-display"
                      style={{ fontSize: 'var(--text-3xl)', display: 'block', lineHeight: 1.1 }}
                    >
                      {offer.newPrice}
                    </span>
                  </div>
                  <div>
                    <span className="badge badge-green" style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-4)' }}>
                      {offer.discount}
                    </span>
                    <p className="small mt-1" style={{ color: '#4ade80' }}>{offer.saving}</p>
                  </div>
                </div>
              </div>

              <div style={{ padding: 'var(--space-6)' }}>
                <OfferLeadForm offer={offer} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
