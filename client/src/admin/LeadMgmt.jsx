'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeads, updateLeadStatus, deleteLead } from '@/store/leadsSlice';
import { Search, Download, Trash2, RefreshCw } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'];
const STATUS_COLORS = {
  New: '#4aa8ff',
  Contacted: 'var(--color-gold)',
  'Follow-up': '#e8623a',
  Converted: '#2ecc71',
  Closed: '#e84040',
};

function exportCSV(leads) {
  const header = 'Name,Phone,Email,Project,Offer,Source,Status,Date';
  const rows = leads.map((lead) =>
    [
      lead.name,
      lead.phone,
      lead.email || '',
      lead.projectInterested || lead.projectId?.title || '',
      lead.offerTitle || lead.offerId?.title || '',
      lead.source,
      lead.status,
      new Date(lead.createdAt).toLocaleDateString('en-IN'),
    ].join(',')
  );

  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'leads.csv';
  anchor.click();
}

export default function LeadMgmt() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { items: leads, total, loading } = useSelector((state) => state.leads);
  const [search, setSearch] = useState('');
  const statusParam = searchParams.get('status');
  const initialStatus = STATUSES.includes(statusParam) ? statusParam : 'All';
  const [filterStatus, setFilter] = useState(initialStatus);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const nextStatus = STATUSES.includes(statusParam) ? statusParam : 'All';
    setFilter(nextStatus);
    setPage(1);
  }, [statusParam]);

  useEffect(() => {
    dispatch(fetchLeads({ page, limit: 20, ...(filterStatus !== 'All' && { status: filterStatus }), ...(search && { search }) }));
  }, [dispatch, page, filterStatus, search]);

  const handleStatusChange = (id, status) => dispatch(updateLeadStatus({ id, status }));
  const handleDelete = (id) => {
    if (confirm('Delete this lead?')) dispatch(deleteLead(id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2 style={{ marginBottom: 2 }}>Leads</h2>
          <p className="small">{total} total leads</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={() => dispatch(fetchLeads({ page, limit: 20, ...(filterStatus !== 'All' && { status: filterStatus }), ...(search && { search }) }))}
            className="btn btn-ghost btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
          <button onClick={() => exportCSV(leads)} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search size={14} style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="form-input" placeholder="Search name, phone, project or offer..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={{ paddingLeft: 'var(--space-9)' }} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {['All', ...STATUSES].map((status) => (
            <button
              key={status}
              onClick={() => { setFilter(status); setPage(1); }}
              className="btn btn-sm"
              style={{
                background: filterStatus === status ? 'var(--surface-active)' : 'var(--surface-card)',
                color: filterStatus === status ? 'var(--color-gold)' : 'var(--text-secondary)',
                border: `1px solid ${filterStatus === status ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
                transition: 'all var(--transition-fast)',
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center' }}><span className="spinner spinner-lg" /></div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {['Name', 'Phone', 'Email', 'Project', 'Offer', 'Source', 'Status', 'Date', ''].map((heading) => (
                    <th key={heading} style={{ padding: 'var(--space-4) var(--space-5)', textAlign: 'left', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-label)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!leads.length ? (
                  <tr>
                    <td colSpan={9} style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No leads found
                    </td>
                  </tr>
                ) : leads.map((lead, index) => (
                  <tr
                    key={lead._id}
                    style={{ borderBottom: '1px solid var(--border-subtle)', background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)', transition: 'background var(--transition-fast)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    <td style={{ padding: 'var(--space-4) var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 'var(--weight-medium)' }}>{lead.name}</td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{lead.phone}</td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{lead.email || '—'}</td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.projectInterested || lead.projectId?.title || '—'}
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.offerTitle || lead.offerId?.title || '—'}
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {lead.source?.replace(/_/g, ' ')}
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)' }}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className="form-select"
                        style={{
                          padding: 'var(--space-1) var(--space-3)',
                          fontSize: 'var(--text-xs)',
                          color: STATUS_COLORS[lead.status],
                          background: `${STATUS_COLORS[lead.status]}12`,
                          border: `1px solid ${STATUS_COLORS[lead.status]}40`,
                          borderRadius: 'var(--radius-full)',
                          width: 'auto',
                          cursor: 'pointer',
                        }}
                      >
                        {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-5)' }}>
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="btn btn-icon btn-ghost"
                        style={{ color: 'var(--color-accent-danger)', opacity: 0.6 }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > 20 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
          <button onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page === 1} className="btn btn-ghost btn-sm">Prev</button>
          <span className="small" style={{ padding: 'var(--space-2) var(--space-4)', color: 'var(--text-secondary)' }}>
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <button onClick={() => setPage((prev) => prev + 1)} disabled={page >= Math.ceil(total / 20)} className="btn btn-ghost btn-sm">Next</button>
        </div>
      )}
    </div>
  );
}
