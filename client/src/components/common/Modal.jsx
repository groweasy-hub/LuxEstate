'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-panel fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div
              className="relative w-full max-w-lg glass rounded-2xl p-8 pointer-events-auto"
              style={{ background: 'var(--surface-modal)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-modal)' }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 btn btn-icon btn-ghost"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              {title && <h3 className="h3 mb-6">{title}</h3>}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
