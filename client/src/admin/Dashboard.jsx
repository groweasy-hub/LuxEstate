'use client';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeadStats } from '@/store/leadsSlice';
import { fetchProjects }  from '@/store/projectsSlice';
import { fetchOffers }    from '@/store/offersSlice';
import { Users, Building2, TrendingUp, Tag } from 'lucide-react';

function CountUp({ target }) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    let cur = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(cur);
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return <span>{val}</span>;
}

const STATUS_COLORS = { New: '#4aa8ff', Contacted: 'var(--color-gold)', 'Follow-up': '#e8623a', Converted: '#2ecc71', Closed: '#e84040' };

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, items: leads } = useSelector((s) => s.leads);
  const { items: projects }     = useSelector((s) => s.projects);
  const { items: offers }       = useSelector((s) => s.offers);

  useEffect(() => {
    dispatch(fetchLeadStats());
    dispatch(fetchProjects({ limit: 100 }));
    dispatch(fetchOffers({ active: true }));
  }, [dispatch]);

  const total     = stats?.total ?? leads.length;
  const converted = stats?.byStatus?.find((s) => s._id === 'Converted')?.count ?? 0;
  const convRate  = total ? Math.round((converted / total) * 100) : 0;
  const recent    = stats?.recent ?? leads.slice(0, 5);

  const statCards = [
    { icon: Users,     label: 'Total Leads',   value: total,            color: '#4aa8ff' },
    { icon: Building2, label: 'Projects',       value: projects.length,  color: 'var(--color-gold)' },
    { icon: TrendingUp,label: 'Conversions',    value: converted,        color: '#2ecc71' },
    { icon: Tag,       label: 'Active Offers',  value: offers.length,    color: '#e8623a' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div>
        <h2 style={{ marginBottom: 'var(--space-1)' }}>Dashboard</h2>
        <p className="small">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
        {statCards.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label} className="card"
            style={{ padding: 'var(--space-6)', transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = ''; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <span className="small">{label}</span>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-light)', color: 'var(--text-primary)', lineHeight: 1 }}>
              <CountUp target={value} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads + Conversion */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h5 style={{ marginBottom: 'var(--space-5)' }}>Recent Leads</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {recent.map((lead) => (
              <div key={lead._id || lead.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'var(--surface-elevated)' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', margin: 0 }}>{lead.name}</p>
                  <p className="small">{lead.projectInterested || lead.project}</p>
                </div>
                <span className="badge" style={{ background: `${STATUS_COLORS[lead.status]}18`, color: STATUS_COLORS[lead.status], border: `1px solid ${STATUS_COLORS[lead.status]}40` }}>
                  {lead.status}
                </span>
              </div>
            ))}
            {!recent.length && <p className="small" style={{ color: 'var(--text-muted)' }}>No leads yet</p>}
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h5 style={{ marginBottom: 'var(--space-5)' }}>Conversion Rate</h5>
          <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-7xl)', fontWeight: 'var(--weight-light)', lineHeight: 1 }} className="text-gradient-gold">
              <CountUp target={convRate} />%
            </div>
            <p className="small mt-4">{converted} of {total} leads converted</p>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ '--progress': `${convRate}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {stats?.byStatus?.map(({ _id, count }) => (
              <div key={_id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[_id] || 'var(--text-muted)' }} />
                <span className="small">{_id}: {count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Source breakdown */}
      {stats?.bySource?.length > 0 && (
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h5 style={{ marginBottom: 'var(--space-5)' }}>Lead Sources</h5>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            {stats.bySource.map(({ _id, count }) => (
              <div key={_id} className="card" style={{ padding: 'var(--space-4)', background: 'var(--surface-elevated)', textAlign: 'center', minWidth: 120 }}>
                <p style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', margin: 0 }}>{count}</p>
                <p className="small" style={{ marginTop: 4 }}>{_id?.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
