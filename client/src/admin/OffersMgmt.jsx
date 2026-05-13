'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { createOffer, updateOffer, deleteOffer, fetchOffers } from '@/store/offersSlice';
import { fetchProjects } from '@/store/projectsSlice';
import { getRequestErrorMessage, uploadAPI } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Tag, Upload, Image as ImageIcon } from 'lucide-react';

const EMPTY = {
  projectId: '',
  title: '',
  badge: '',
  badgeType: 'gold',
  tag: '',
  discount: '',
  oldPrice: '',
  newPrice: '',
  saving: '',
  offerText: '',
  unitsLeft: '',
  expiryDate: '',
  bannerImage: '',
  featuresText: '',
  active: true,
  featuredDeal: false,
  topOffer: false,
  currentDeal: true,
};

const BADGE_TYPES = ['gold', 'red', 'green'];
const OFFER_FIELDS = [
  ['title', 'Offer Title', 'e.g. Skyline Residency Launch Offer'],
  ['badge', 'Badge', 'e.g. Limited Time'],
  ['tag', 'Tag', 'e.g. Festive Deal'],
  ['discount', 'Discount', 'e.g. 15% OFF'],
  ['oldPrice', 'Old Price', 'e.g. Rs 1.20 Cr'],
  ['newPrice', 'New Price', 'e.g. Rs 1.02 Cr'],
  ['saving', 'Saving Text', 'e.g. Save Rs 18 Lakhs'],
  ['unitsLeft', 'Units Left', 'e.g. 6'],
  ['expiryDate', 'Expiry Date', 'Select offer expiry date and time'],
];

function buildInitialForm(offer) {
  if (!offer) return EMPTY;

  return {
    projectId: offer.projectId?._id || offer.projectId || '',
    title: offer.title || '',
    badge: offer.badge || '',
    badgeType: offer.badgeType || 'gold',
    tag: offer.tag || '',
    discount: offer.discount || '',
    oldPrice: offer.oldPrice || '',
    newPrice: offer.newPrice || '',
    saving: offer.saving || '',
    offerText: offer.offerText || offer.description || '',
    unitsLeft: offer.unitsLeft || '',
    expiryDate: offer.expiryDate ? new Date(offer.expiryDate).toISOString().slice(0, 16) : '',
    bannerImage: offer.bannerImage || '',
    featuresText: (offer.features || []).join(', '),
    active: offer.active !== false,
    featuredDeal: Boolean(offer.featuredDeal),
    topOffer: Boolean(offer.topOffer),
    currentDeal: offer.currentDeal !== false,
  };
}

function OfferModal({ offer, projects, onClose, onSave, saving }) {
  const [form, setForm] = useState(buildInitialForm(offer));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const selectedProject = projects.find((project) => project._id === form.projectId);
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleProjectChange = (projectId) => {
    const project = projects.find((item) => item._id === projectId);
    setForm((prev) => ({
      ...prev,
      projectId,
      title: prev.title || (project ? `${project.title} Offer` : ''),
      bannerImage: prev.bannerImage || project?.thumbnail || '',
    }));
  };

  const handleBannerUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const { data } = await uploadAPI.single(file);
      set('bannerImage', data.url);
    } catch (err) {
      setError(getRequestErrorMessage(err, 'Offer image upload failed'));
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleSave = () => {
    if (!form.projectId || !form.title.trim() || !form.discount.trim() || !form.oldPrice.trim() || !form.newPrice.trim() || !form.expiryDate) {
      setError('Project, title, discount, old price, new price, and expiry date are required.');
      return;
    }

    onSave({
      projectId: form.projectId,
      title: form.title.trim(),
      badge: form.badge.trim() || undefined,
      badgeType: form.badgeType,
      tag: form.tag.trim() || undefined,
      discount: form.discount.trim(),
      oldPrice: form.oldPrice.trim(),
      newPrice: form.newPrice.trim(),
      saving: form.saving.trim() || undefined,
      offerText: form.offerText.trim() || undefined,
      unitsLeft: form.unitsLeft === '' ? undefined : Number(form.unitsLeft),
      expiryDate: new Date(form.expiryDate).toISOString(),
      active: form.active,
      featuredDeal: form.featuredDeal,
      topOffer: form.topOffer,
      currentDeal: form.currentDeal,
      bannerImage: form.bannerImage || selectedProject?.thumbnail || undefined,
      features: form.featuresText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <AnimatePresence>
      <motion.div key="offer-modal-backdrop" className="overlay-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ zIndex: 'var(--z-overlay)' }} />
      <motion.div
        key="offer-modal-panel"
        className="hide-scrollbar"
        style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-modal)', overflowY: 'auto', overflowX: 'hidden', padding: 'var(--space-6) var(--space-4)', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="card hide-scrollbar"
          style={{ width: '100%', maxWidth: 760, margin: '0 auto', padding: 'var(--space-8)', background: 'var(--surface-modal)', maxHeight: 'calc(100vh - 3rem)', overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          onClick={(event) => event.stopPropagation()}
          initial={{ y: 40, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
            <h4>{offer ? 'Edit Offer' : 'Add Offer'}</h4>
            <button onClick={onClose} className="btn btn-icon btn-ghost"><X size={16} /></button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Project</label>
              <select className="form-select" value={form.projectId} onChange={(e) => handleProjectChange(e.target.value)}>
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            {OFFER_FIELDS.map(([key, label, placeholder]) => (
              <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                <input
                  className="form-input"
                  type={key === 'expiryDate' ? 'datetime-local' : 'text'}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                />
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">Badge Type</label>
              <select className="form-select" value={form.badgeType} onChange={(e) => set('badgeType', e.target.value)}>
                {BADGE_TYPES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Offer Text</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={form.offerText}
                onChange={(e) => set('offerText', e.target.value)}
                placeholder="Write the offer summary customers should see, like free registration, cashback, or limited-period pricing."
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Features (comma separated)</label>
              <input className="form-input" value={form.featuresText} onChange={(e) => set('featuresText', e.target.value)} placeholder="3 BHK, 1850 sq.ft, Sea View" />
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <h6 style={{ margin: 0 }}>Offer Banner</h6>
                <p className="small" style={{ marginTop: 4 }}>Upload banner image to Cloudinary or use the project thumbnail.</p>
              </div>
              <label className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', cursor: uploading ? 'wait' : 'pointer' }}>
                {uploading ? <span className="spinner" /> : <Upload size={14} />}
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleBannerUpload} disabled={uploading} style={{ display: 'none' }} />
              </label>
            </div>
            {form.bannerImage ? (
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <img src={form.bannerImage} alt="Offer banner" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
              </div>
            ) : (
              <div style={{ height: 220, display: 'grid', placeItems: 'center', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
                <div style={{ textAlign: 'center' }}>
                  <ImageIcon size={24} style={{ marginBottom: 8 }} />
                  <p className="small" style={{ margin: 0 }}>No banner selected</p>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
            {[
              ['active', 'Active'],
              ['featuredDeal', 'Featured Deal'],
              ['topOffer', 'Top Offer'],
              ['currentDeal', 'Current Deal'],
            ].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form[key]} onChange={(e) => set(key, e.target.checked)} />
                <span className="small">{label}</span>
              </label>
            ))}
          </div>

          {error && (
            <div className="card" style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', border: '1px solid rgba(232,64,64,0.35)', color: '#ff8b8b' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button onClick={handleSave} disabled={saving || uploading} className="btn btn-primary">
              {saving ? <span className="spinner" /> : (offer ? 'Save Changes' : 'Create Offer')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function OffersMgmt() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const offers = useSelector((state) => state.offers.items);
  const projects = useSelector((state) => state.projects.items);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const activeOnly = searchParams.get('active') === 'true';

  useEffect(() => {
    dispatch(fetchOffers({}));
    dispatch(fetchProjects({ limit: 100 }));
  }, [dispatch]);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.title.localeCompare(b.title)),
    [projects]
  );
  const visibleOffers = activeOnly ? offers.filter((offer) => offer.active) : offers;

  const handleSave = async (data) => {
    setSaving(true);
    if (modal === 'add') await dispatch(createOffer(data));
    else await dispatch(updateOffer({ id: modal._id, data }));
    setSaving(false);
    setModal(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2 style={{ marginBottom: 2 }}>Offers</h2>
          <p className="small">
            {activeOnly ? 'Showing active offers only. ' : ''}
            {offers.filter((offer) => offer.active).length} active | {offers.length} total
          </p>
        </div>
        <button onClick={() => setModal('add')} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Plus size={14} /> Add Offer
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <AnimatePresence>
          {visibleOffers.map((offer) => (
            <motion.div
              key={offer._id || offer.id}
              className="card"
              style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', opacity: offer.active ? 1 : 0.5, transition: 'opacity var(--transition-normal)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: offer.active ? 1 : 0.5, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              layout
            >
              <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: offer.active ? 'var(--surface-hover)' : 'var(--surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                {offer.bannerImage ? (
                  <img src={offer.bannerImage} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <Tag size={16} color={offer.active ? 'var(--color-gold)' : 'var(--text-muted)'} />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 'var(--weight-medium)', margin: 0, marginBottom: 2 }}>
                  {offer.title}
                </p>
                <p className="small" style={{ marginBottom: 4 }}>
                  {(offer.projectId?.title || 'No project linked')} | {offer.discount || 'No discount'}
                </p>
                <p className="small" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {offer.offerText || 'No offer description'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                <label className="toggle-switch" title={offer.active ? 'Deactivate' : 'Activate'}>
                  <input
                    type="checkbox"
                    checked={offer.active}
                    onChange={() =>
                      dispatch(
                        updateOffer({
                          id: offer._id || offer.id,
                          data: { active: !offer.active },
                        })
                      )
                    }
                  />
                  <span className="toggle-slider" />
                </label>
                <button onClick={() => setModal(offer)} className="btn btn-icon btn-ghost" style={{ color: 'var(--color-gold)' }}><Pencil size={13} /></button>
                <button onClick={() => dispatch(deleteOffer(offer._id || offer.id))} className="btn btn-icon btn-ghost" style={{ color: 'var(--color-accent-danger)' }}><Trash2 size={13} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleOffers.length === 0 && (
          <div className="card" style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>
            {activeOnly ? 'No active offers right now.' : 'No offers yet. Add your first offer for an existing project.'}
          </div>
        )}
      </div>

      {modal && (
        <OfferModal
          offer={modal === 'add' ? null : modal}
          projects={sortedProjects}
          onClose={() => setModal(null)}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
