'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScroll } from '@/hooks/useScroll';

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/offers', label: 'Offers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const linkStyle = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-sm)',
  letterSpacing: 'var(--tracking-wide)',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  position: 'relative',
  transition: 'color 0.2s',
};

export default function Navigation() {
  const { scrolled } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 'var(--nav-height)',
          zIndex: 'var(--z-sticky)',
          background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-nav)' : 'none',
          transition: 'background 0.4s, box-shadow 0.4s',
        }}
      >
        {/* 3-column grid: logo | nav | cta */}
        <div
          style={{
            maxWidth: 'var(--container-xl)',
            margin: '0 auto',
            padding: '0 var(--space-8)',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          {/* LEFT — Logo */}
          <Link href="/" style={{ textDecoration: 'none', justifySelf: 'start' }}>
            <span
              className="text-gradient-gold"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-light)',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              LuxEstate
            </span>
          </Link>

          {/* CENTER — Nav links (hidden on mobile) */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-8)',
            }}
            className="nav-desktop"
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link"
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {label}
                <span className="nav-underline" />
              </Link>
            ))}
          </nav>

          {/* RIGHT — Book Visit + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', justifySelf: 'end' }}>
            <Link
              href="/contact"
              className="btn btn-primary btn-sm animate-gold-glow nav-cta"
            >
              Book Visit
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="btn btn-icon btn-ghost nav-hamburger"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{
              position: 'fixed', inset: 0,
              zIndex: 'var(--z-modal)',
              background: 'var(--surface-page)',
              display: 'flex', flexDirection: 'column',
            }}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Mobile header */}
            <div
              style={{
                height: 'var(--nav-height)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 var(--space-8)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span
                className="text-gradient-gold"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}
              >
                LuxEstate
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="btn btn-icon btn-ghost"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile links */}
            <nav
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)',
              }}
            >
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 'var(--weight-light)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary btn-lg"
                >
                  Book Visit
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav responsive styles */}
      <style>{`
        .nav-underline {
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1px;
          background: var(--color-gold);
          transition: width 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover .nav-underline { width: 100%; }

        /* Desktop: show nav + cta, hide hamburger */
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-cta     { display: inline-flex !important; }
          .nav-hamburger { display: none !important; }
        }

        /* Mobile: hide nav + cta, show hamburger */
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-hamburger { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
