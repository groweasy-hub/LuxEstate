'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '@/store/projectsSlice';
import { getRequestErrorMessage, uploadAPI } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Star, Upload, Image as ImageIcon } from 'lucide-react';

const EMPTY = {
  title: '',
  slug: '',
  builderName: '',
  builderDesc: '',
  builderLogo: '',
  'location.address': '',
  'location.city': '',
  'location.area': '',
  'pricing.minPrice': '',
  'pricing.maxPrice': '',
  'pricing.priceLabel': '',
  'pricing.priceRange': '',
  propertyType: 'apartment',
  status: 'ready',
  badge: '',
  featured: false,
  showOnHomepage: true,
  beds: '',
  baths: '',
  area: '',
  areaRange: '',
  unitsLeft: '',
  totalUnits: '',
  possession: '',
  rera: '',
  description: '',
  pricingNote: '',
  highlightsText: '',
  amenitiesText: '',
  floorPlansText: '',
  priceTableText: '',
  specsText: '',
  thumbnail: '',
  galleryImages: [],
};

const TYPES = ['apartment', 'villa', 'penthouse', 'plot'];
const STATUSES = ['ready', 'under-construction', 'sold-out'];
const PROJECT_FIELDS = [
  ['title', 'Project Title', 'e.g. Skyline Residency'],
  ['slug', 'Slug (optional)', 'e.g. skyline-residency'],
  ['builderName', 'Builder Name', 'e.g. Prestige Group'],
  ['builderDesc', 'Builder Description', 'e.g. Premium developer known for luxury towers'],
  ['location.address', 'Address', 'e.g. MG Road, Bengaluru'],
  ['location.city', 'City', 'e.g. Bengaluru'],
  ['location.area', 'Area / Locality', 'e.g. Whitefield'],
  ['rera', 'RERA Number', 'e.g. PRM/KA/RERA/1251/446/PR/210325/007654'],
  ['possession', 'Possession', 'e.g. December 2027'],
  ['area', 'Area', 'e.g. 1850 sq.ft'],
  ['areaRange', 'Area Range', 'e.g. 1200 - 1850 sq.ft'],
  ['beds', 'Beds', 'e.g. 3'],
  ['baths', 'Baths', 'e.g. 3'],
  ['unitsLeft', 'Units Left', 'e.g. 12'],
  ['totalUnits', 'Total Units', 'e.g. 240'],
  ['pricing.minPrice', 'Min Price', 'e.g. 8500000'],
  ['pricing.maxPrice', 'Max Price', 'e.g. 12500000'],
  ['pricing.priceLabel', 'Price Label', 'e.g. Starting at Rs 85 Lakhs'],
  ['pricing.priceRange', 'Price Range', 'e.g. Rs 85 Lakhs - Rs 1.25 Cr'],
];
const AMENITY_ICON_ALIASES = {
  '🏊': 'pool',
  '💪': 'gym',
  '🛎️': 'concierge',
  '🛎': 'concierge',
  '🔒': 'security',
  '💼': 'biz',
  '🎬': 'theatre',
  '🌇': 'roof',
  '🌿': 'garden',
  '🧘': 'yoga',
  '🚗': 'parking',
  pool: 'pool',
  gym: 'gym',
  spa: 'spa',
  concierge: 'concierge',
  security: 'security',
  biz: 'biz',
  theatre: 'theatre',
  roof: 'roof',
  garden: 'garden',
  yoga: 'yoga',
  parking: 'parking',
  club: 'club',
  kids: 'kids',
  jog: 'jog',
  lounge: 'lounge',
};

function toNumberOrUndefined(value) {
  if (value === '' || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function normalizeGalleryImages(images) {
  return [...new Set((images || []).filter((item) => typeof item === 'string' && item.trim()))];
}

function serializeHighlights(highlights = []) {
  return highlights
    .map((item) => (typeof item === 'string' ? item : item?.label))
    .filter(Boolean)
    .join('\n');
}

function serializeAmenities(amenities = []) {
  return amenities
    .map((item) => `${item.icon || 'default'} | ${item.label || ''}`.trim())
    .filter(Boolean)
    .join('\n');
}

function serializeFloorPlans(floorPlans = []) {
  return floorPlans
    .map((item) => [item.type, item.area, item.price, item.img].filter(Boolean).join(' | '))
    .filter(Boolean)
    .join('\n');
}

function serializePriceTable(priceTable = []) {
  return priceTable
    .map((item) => [item.config, item.area, item.floor, item.price, item.status].filter(Boolean).join(' | '))
    .filter(Boolean)
    .join('\n');
}

function serializeSpecs(specs = {}) {
  return Object.entries(specs)
    .flatMap(([category, items]) =>
      (items || []).map((item) => [category, item?.label, item?.value].filter(Boolean).join(' | '))
    )
    .join('\n');
}

function splitStructuredLine(line) {
  return line
    .split(/\s*\|\s*|\t+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseLineList(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function resolveAmenityIcon(iconValue = '', label = '') {
  const normalizedIcon = iconValue.trim().toLowerCase();
  if (AMENITY_ICON_ALIASES[iconValue]) return AMENITY_ICON_ALIASES[iconValue];
  if (AMENITY_ICON_ALIASES[normalizedIcon]) return AMENITY_ICON_ALIASES[normalizedIcon];

  const normalizedLabel = label.toLowerCase();
  if (normalizedLabel.includes('pool')) return 'pool';
  if (normalizedLabel.includes('spa')) return 'spa';
  if (normalizedLabel.includes('gym') || normalizedLabel.includes('wellness')) return 'gym';
  if (normalizedLabel.includes('concierge')) return 'concierge';
  if (normalizedLabel.includes('security')) return 'security';
  if (normalizedLabel.includes('business')) return 'biz';
  if (normalizedLabel.includes('theatre')) return 'theatre';
  if (normalizedLabel.includes('sky')) return 'roof';
  return 'default';
}

function parseHighlights(text) {
  return parseLineList(text).map((label) => ({ label, icon: 'default' }));
}

function parseAmenities(text) {
  return parseLineList(text)
    .map((line) => {
      const parts = splitStructuredLine(line);
      if (parts.length === 1) {
        return { icon: resolveAmenityIcon('', parts[0]), label: parts[0] };
      }

      const [iconValue, ...labelParts] = parts;
      const label = labelParts.join(' | ').trim();
      return { icon: resolveAmenityIcon(iconValue, label), label };
    })
    .filter((item) => item.label);
}

function parseFloorPlans(text) {
  return parseLineList(text)
    .map((line) => {
      const [type = '', area = '', price = '', img = ''] = splitStructuredLine(line);
      return { type, area, price, ...(img && { img }) };
    })
    .filter((item) => item.type || item.area || item.price);
}

function normalizePriceStatus(value = '') {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'limited') return 'Limited';
  if (normalized === 'sold out' || normalized === 'sold-out') return 'Sold Out';
  return 'Available';
}

function parsePriceTable(text) {
  return parseLineList(text)
    .map((line) => {
      const [config = '', area = '', floor = '', price = '', status = 'Available'] = splitStructuredLine(line);
      return {
        config,
        area,
        floor,
        price,
        status: normalizePriceStatus(status),
      };
    })
    .filter((item) => item.config || item.area || item.floor || item.price);
}

function parseSpecs(text) {
  return parseLineList(text).reduce((acc, line) => {
    const [category = '', label = '', value = ''] = splitStructuredLine(line);
    if (!category || !label || !value) return acc;

    if (!acc[category]) acc[category] = [];
    acc[category].push({ label, value });
    return acc;
  }, {});
}

function buildInitialForm(project) {
  if (!project) return EMPTY;

  return {
    title: project.title || '',
    slug: project.slug || '',
    builderName: project.builderName || '',
    builderDesc: project.builderDesc || project.builderInfo?.description || '',
    builderLogo: project.builderLogo || project.builderInfo?.logo || '',
    'location.address': project.location?.address || '',
    'location.city': project.location?.city || '',
    'location.area': project.location?.area || '',
    'pricing.minPrice': project.pricing?.minPrice || '',
    'pricing.maxPrice': project.pricing?.maxPrice || '',
    'pricing.priceLabel': project.pricing?.priceLabel || '',
    'pricing.priceRange': project.pricing?.priceRange || '',
    propertyType: project.propertyType || 'apartment',
    status: project.status || 'ready',
    badge: project.badge || '',
    featured: Boolean(project.featured),
    showOnHomepage: project.showOnHomepage !== false,
    beds: project.beds || '',
    baths: project.baths || '',
    area: project.area || '',
    areaRange: project.areaRange || '',
    unitsLeft: project.unitsLeft || '',
    totalUnits: project.totalUnits || '',
    possession: project.possession || '',
    rera: project.rera || '',
    description: project.description || '',
    pricingNote: project.pricingNote || '',
    highlightsText: serializeHighlights(project.highlights),
    amenitiesText: serializeAmenities(project.amenities),
    floorPlansText: serializeFloorPlans(project.floorPlans),
    priceTableText: serializePriceTable(project.priceTable),
    specsText: serializeSpecs(project.specs),
    thumbnail: project.thumbnail || '',
    galleryImages: normalizeGalleryImages(project.galleryImages),
  };
}

function UploadField({ label, multiple = false, onChange, loading, accept }) {
  return (
    <label
      className="btn btn-secondary btn-sm"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        cursor: loading ? 'wait' : 'pointer',
      }}
    >
      {loading ? <span className="spinner" /> : <Upload size={14} />}
      {loading ? 'Uploading...' : label}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={loading}
        onChange={onChange}
        style={{ display: 'none' }}
      />
    </label>
  );
}

function ProjectModal({ project, onClose, onSave, loading }) {
  const [form, setForm] = useState(buildInitialForm(project));
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleThumbUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingThumb(true);
    setError('');

    try {
      const { data } = await uploadAPI.single(file);
      set('thumbnail', data.url);
    } catch (err) {
      setError(getRequestErrorMessage(err, 'Thumbnail upload failed'));
    } finally {
      setUploadingThumb(false);
      event.target.value = '';
    }
  };

  const handleGalleryUpload = async (event) => {
    const files = [...(event.target.files || [])];
    if (!files.length) return;

    setUploadingGallery(true);
    setError('');

    try {
      const { data } = await uploadAPI.multiple(files);
      setForm((prev) => ({
        ...prev,
        galleryImages: normalizeGalleryImages([
          ...prev.galleryImages,
          ...data.urls.map((item) => item.url),
        ]),
      }));
    } catch (err) {
      setError(getRequestErrorMessage(err, 'Gallery upload failed'));
    } finally {
      setUploadingGallery(false);
      event.target.value = '';
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.builderName.trim() || !form['location.city'].trim()) {
      setError('Title, builder name, and city are required.');
      return;
    }

    const floorPlans = parseFloorPlans(form.floorPlansText);
    const priceTable = parsePriceTable(form.priceTableText);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || undefined,
      builderName: form.builderName.trim(),
      builderDesc: form.builderDesc.trim() || undefined,
      builderLogo: form.builderLogo || undefined,
      builderInfo: {
        name: form.builderName.trim(),
        logo: form.builderLogo || undefined,
        description: form.builderDesc.trim() || undefined,
      },
      location: {
        address: form['location.address'].trim() || undefined,
        city: form['location.city'].trim(),
        area: form['location.area'].trim() || undefined,
      },
      pricing: {
        minPrice: toNumberOrUndefined(form['pricing.minPrice']),
        maxPrice: toNumberOrUndefined(form['pricing.maxPrice']),
        priceLabel: form['pricing.priceLabel'].trim() || undefined,
        priceRange: form['pricing.priceRange'].trim() || undefined,
      },
      propertyType: form.propertyType,
      status: form.status,
      badge: form.badge || null,
      featured: form.featured,
      showOnHomepage: form.showOnHomepage,
      beds: toNumberOrUndefined(form.beds),
      baths: toNumberOrUndefined(form.baths),
      area: form.area.trim() || undefined,
      areaRange: form.areaRange.trim() || undefined,
      unitsLeft: toNumberOrUndefined(form.unitsLeft),
      totalUnits: toNumberOrUndefined(form.totalUnits),
      possession: form.possession.trim() || undefined,
      rera: form.rera.trim() || undefined,
      description: form.description.trim() || undefined,
      pricingNote: form.pricingNote.trim() || undefined,
      highlights: parseHighlights(form.highlightsText),
      amenities: parseAmenities(form.amenitiesText),
      floorPlans,
      configurations: floorPlans.map((item) => ({
        type: item.type,
        area: item.area,
        price: item.price,
      })),
      priceTable,
      specs: parseSpecs(form.specsText),
      thumbnail: form.thumbnail || undefined,
      galleryImages: normalizeGalleryImages(form.galleryImages),
    };

    onSave(payload);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="project-modal-backdrop"
        className="overlay-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ zIndex: 'var(--z-overlay)' }}
      />
      <motion.div
        key="project-modal-panel"
        className="hide-scrollbar"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--z-modal)',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 'var(--space-6) var(--space-4)',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="card hide-scrollbar"
          style={{
            width: '100%',
            maxWidth: 860,
            margin: '0 auto',
            padding: 'var(--space-8)',
            background: 'var(--surface-modal)',
            maxHeight: 'calc(100vh - 3rem)',
            overflowY: 'auto',
            overflowX: 'hidden',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
          onClick={(event) => event.stopPropagation()}
          initial={{ y: 40, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
            <h4>{project ? 'Edit Project' : 'Add Project'}</h4>
            <button onClick={onClose} className="btn btn-icon btn-ghost"><X size={16} /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
              {PROJECT_FIELDS.map(([key, label, placeholder]) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input
                    className="form-input"
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div className="form-group">
                <label className="form-label">Property Type</label>
                <select className="form-select" value={form.propertyType} onChange={(e) => set('propertyType', e.target.value)}>
                  {TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={(e) => set('status', e.target.value)}>
                  {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Badge</label>
                <select className="form-select" value={form.badge} onChange={(e) => set('badge', e.target.value)}>
                  <option value="">None</option>
                  <option value="Featured">Featured</option>
                  <option value="New">New</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Describe the project, lifestyle highlights, location benefits, and major amenities."
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Overview Highlights</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={form.highlightsText}
                  onChange={(e) => set('highlightsText', e.target.value)}
                  placeholder={`One highlight per line\nSea Link and Arabian Sea views\nPrivate elevator access\nPremium sky amenities\nLuxury under-construction inventory`}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Specifications</label>
                <textarea
                  className="form-textarea"
                  rows={6}
                  value={form.specsText}
                  onChange={(e) => set('specsText', e.target.value)}
                  placeholder={`Use: Category | Label | Value\nStructure | Structure | High-rise RCC tower with seismic design compliance\nStructure | Floors | 65 floors\nStructure | Total Units | 120 residences`}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Amenities</label>
                <textarea
                  className="form-textarea"
                  rows={6}
                  value={form.amenitiesText}
                  onChange={(e) => set('amenitiesText', e.target.value)}
                  placeholder={`Use: icon | label\npool | Sky Pool\nspa | Spa and Wellness\nconcierge | Concierge\nsecurity | Biometric Security\nbiz | Business Lounge\ntheatre | Private Theatre`}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Floor Plans</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={form.floorPlansText}
                  onChange={(e) => set('floorPlansText', e.target.value)}
                  placeholder={`Use: Type | Area | Price | Image URL (optional)\n3 BHK | 2400 sq.ft | Rs. 7.5 Cr\n4 BHK | 3200 sq.ft | Rs. 10 Cr\nPenthouse | 6000 sq.ft | Rs. 18 Cr`}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Pricing Note</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={form.pricingNote}
                  onChange={(e) => set('pricingNote', e.target.value)}
                  placeholder="Prices are inclusive of basic price. Additional charges like PLC, car parking, and registration are extra. Contact our sales team for a detailed cost sheet."
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Pricing Table</label>
                <textarea
                  className="form-textarea"
                  rows={6}
                  value={form.priceTableText}
                  onChange={(e) => set('priceTableText', e.target.value)}
                  placeholder={`Use: Configuration | Area | Floor | Price | Status\n3 BHK | 2400 sq.ft | 10-40 | Rs. 7.5 Cr | Available\n4 BHK | 3200 sq.ft | 40-60 | Rs. 10 Cr | Limited\nPenthouse | 6000 sq.ft | 61-65 | Rs. 18 Cr | Limited`}
                />
              </div>
            </section>

            <section style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              {[
                ['featured', 'Featured on Homepage'],
                ['showOnHomepage', 'Show on Homepage'],
              ].map(([key, label]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form[key]} onChange={(e) => set(key, e.target.checked)} />
                  <span className="small">{label}</span>
                </label>
              ))}
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-6)' }}>
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <h6 style={{ margin: 0 }}>Primary Image</h6>
                    <p className="small" style={{ marginTop: 4 }}>Upload to Cloudinary and save the returned URL.</p>
                  </div>
                  <UploadField label="Upload Image" onChange={handleThumbUpload} loading={uploadingThumb} accept="image/*" />
                </div>
                {form.thumbnail ? (
                  <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                    <img src={form.thumbnail} alt="Project thumbnail" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                  </div>
                ) : (
                  <div style={{ height: 220, display: 'grid', placeItems: 'center', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
                    <div style={{ textAlign: 'center' }}>
                      <ImageIcon size={24} style={{ marginBottom: 8 }} />
                      <p className="small" style={{ margin: 0 }}>No image uploaded yet</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <h6 style={{ margin: 0 }}>Gallery Images</h6>
                    <p className="small" style={{ marginTop: 4 }}>You can add multiple project images from Cloudinary.</p>
                  </div>
                  <UploadField label="Upload Gallery" multiple onChange={handleGalleryUpload} loading={uploadingGallery} accept="image/*" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-3)' }}>
                  {form.galleryImages.map((url, index) => (
                    <div key={`${url}-${index}`} style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                      <img src={url} alt="Project gallery" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="btn btn-icon"
                        style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.65)', color: '#fff' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {!form.galleryImages.length && (
                    <div style={{ gridColumn: '1 / -1', height: 120, display: 'grid', placeItems: 'center', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
                      <p className="small" style={{ margin: 0 }}>No gallery images yet</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {error && (
              <div className="card" style={{ padding: 'var(--space-4)', border: '1px solid rgba(232,64,64,0.35)', color: '#ff8b8b' }}>
                {error}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button onClick={handleSave} disabled={loading || uploadingThumb || uploadingGallery} className="btn btn-primary">
              {loading ? <span className="spinner" /> : (project ? 'Save Changes' : 'Add Project')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectMgmt() {
  const dispatch = useDispatch();
  const { items: projects, total, loading } = useSelector((state) => state.projects);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProjects({ limit: 50, ...(search && { search }) }));
  }, [dispatch, search]);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.title.localeCompare(b.title)),
    [projects]
  );

  const statusColor = { ready: '#2ecc71', 'under-construction': '#4aa8ff', 'sold-out': '#e84040' };

  const handleSave = async (data) => {
    setSaving(true);
    if (modal === 'add') await dispatch(createProject(data));
    else await dispatch(updateProject({ id: modal._id, data }));
    setSaving(false);
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) dispatch(deleteProject(id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2 style={{ marginBottom: 2 }}>Projects</h2>
          <p className="small">{total} total projects</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <input className="form-input" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 220 }} />
          <button onClick={() => setModal('add')} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}><span className="spinner spinner-lg" /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
          {sortedProjects.map((project) => (
            <div
              key={project._id}
              className="card"
              style={{ padding: 0, overflow: 'hidden', transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ height: 180, background: '#111' }}>
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>
                    <ImageIcon size={22} />
                  </div>
                )}
              </div>
              <div style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <span className="badge" style={{ background: `${statusColor[project.status]}18`, color: statusColor[project.status], border: `1px solid ${statusColor[project.status]}40` }}>{project.status}</span>
                    {project.featured && <Star size={13} color="var(--color-gold)" fill="var(--color-gold)" />}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                    <button onClick={() => setModal(project)} className="btn btn-icon btn-ghost" style={{ color: 'var(--color-gold)' }}><Pencil size={13} /></button>
                    <button onClick={() => handleDelete(project._id)} className="btn btn-icon btn-ghost" style={{ color: 'var(--color-accent-danger)' }}><Trash2 size={13} /></button>
                  </div>
                </div>
                <h5 style={{ marginBottom: 'var(--space-1)' }}>{project.title}</h5>
                <p className="small" style={{ marginBottom: 'var(--space-4)' }}>{project.location?.city} · {project.builderName}</p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                  {[['Price', project.pricing?.priceLabel || '—'], ['Beds', project.beds || '—'], ['Area', project.area || '—']].map(([key, value]) => (
                    <div key={key}>
                      <p className="overline" style={{ fontSize: 10, marginBottom: 2 }}>{key}</p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {!sortedProjects.length && !loading && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 'var(--space-12)', color: 'var(--text-muted)' }}>
              No projects yet. Add your first project.
            </div>
          )}
        </div>
      )}

      {modal && (
        <ProjectModal
          project={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          loading={saving}
        />
      )}
    </div>
  );
}
