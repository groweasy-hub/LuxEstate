'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutDashboard, Users, Building2, Tag, Menu, LogOut, ChevronRight } from 'lucide-react';
import { fetchMe, loginAdmin, logoutAdmin } from '@/store/authSlice';
import { SITE_CONFIG } from '@/lib/siteConfig';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/projects', label: 'Projects', icon: Building2 },
  { href: '/admin/offers', label: 'Offers', icon: Tag },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { admin, loading, error, checked } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  useEffect(() => {
    if (!checked) dispatch(fetchMe());
  }, [checked, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    await dispatch(loginAdmin(credentials));
  };

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
  };

  if (!checked && !admin) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--surface-page)', padding: 'var(--space-6)' }}>
        <div className="card" style={{ width: '100%', maxWidth: 420, padding: 'var(--space-8)', textAlign: 'center' }}>
          <h4 style={{ marginBottom: 'var(--space-3)' }}>Checking admin session</h4>
          <p className="small" style={{ marginBottom: 'var(--space-6)' }}>Please wait while we verify your access.</p>
          <span className="spinner spinner-lg" />
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--surface-page)', padding: 'var(--space-6)' }}>
        <div className="card" style={{ width: '100%', maxWidth: 440, padding: 'var(--space-8)' }}>
          <div style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Admin Login</h3>
            <p className="small" style={{ margin: 0 }}>Sign in to manage projects, offers, leads, and uploads.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter admin email"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Enter admin password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="card" style={{ padding: 'var(--space-4)', border: '1px solid rgba(232,64,64,0.35)', color: '#ff8b8b' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Login to Admin'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface-page)', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? 64 : 220,
          flexShrink: 0,
          background: 'var(--surface-base)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s var(--ease-out-expo)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            padding: collapsed ? 0 : '0 var(--space-5)',
            borderBottom: '1px solid var(--border-subtle)',
            flexShrink: 0,
          }}
        >
          {!collapsed && (
            <span className="text-gradient-gold" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', whiteSpace: 'nowrap' }}>
              {SITE_CONFIG.brandName}
            </span>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="btn btn-icon btn-ghost"
            style={{ flexShrink: 0 }}
          >
            {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: 'var(--space-4) var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  background: active ? 'var(--surface-active)' : 'transparent',
                  color: active ? 'var(--color-gold)' : 'var(--text-secondary)',
                  border: active ? '1px solid var(--border-gold)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-ui)',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--surface-hover)'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: 'var(--space-4) var(--space-2)', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handleLogout}
            className="btn btn-ghost"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              justifyContent: collapsed ? 'center' : 'flex-start',
              marginBottom: 'var(--space-2)',
            }}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {!collapsed && 'Sign Out'}
          </button>
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)', fontSize: 'var(--text-sm)',
              textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {!collapsed && 'Back to Site'}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        {/* Topbar */}
        <header
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--space-8)',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--surface-base)',
            flexShrink: 0,
          }}
        >
          <h6 style={{ color: 'var(--text-primary)', margin: 0 }}>
            {navItems.find((n) => n.href === pathname)?.label ?? 'Admin'}
          </h6>
          <div className="badge badge-gold">Admin Panel</div>
        </header>

        {/* Page content */}
        <main
          className="hide-scrollbar"
          style={{
            flex: 1,
            minHeight: 0,
            padding: 'var(--space-8)',
            overflowY: 'auto',
            overflowX: 'hidden',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
