const Lead = require('../models/Lead');
const Project = require('../models/Project');
const Offer = require('../models/Offer');
const { sendLeadEmails } = require('../utils/emailService');

// GET /api/leads  (admin)
exports.getAll = async (req, res, next) => {
  try {
    const { status, source, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'All') query.status = status;
    if (source && source !== 'All') query.source = source;
    if (search) query.$or = [
      { name:  { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { projectInterested: { $regex: search, $options: 'i' } },
      { offerTitle: { $regex: search, $options: 'i' } },
    ];

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Lead.countDocuments(query);
    const items = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('projectId', 'title slug')
      .populate('offerId', 'title')
      .select('-__v');

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), items });
  } catch (err) { next(err); }
};

// GET /api/leads/stats  (admin)
exports.getStats = async (req, res, next) => {
  try {
    const total     = await Lead.countDocuments();
    const byStatus  = await Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
    const bySource  = await Lead.aggregate([{ $group: { _id: '$source', count: { $sum: 1 } } }]);
    const recent    = await Lead.find().sort({ createdAt: -1 }).limit(5).select('name phone projectInterested offerTitle status createdAt');
    res.json({ success: true, total, byStatus, bySource, recent });
  } catch (err) { next(err); }
};

// GET /api/leads/:id  (admin)
exports.getOne = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('projectId', 'title slug').populate('offerId', 'title').select('-__v');
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (err) { next(err); }
};

// POST /api/leads  (public — form submissions)
exports.create = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    // imageUrl and offerDiscount are email-only fields, not stored in DB
    let projectImage   = payload.imageUrl    || '';
    const offerDiscount = payload.offerDiscount || '';
    let offerImage     = '';
    delete payload.imageUrl;
    delete payload.offerDiscount;

    if (payload.projectId) {
      const project = await Project.findById(payload.projectId).select('title thumbnail galleryImages').catch(() => null);
      if (project) {
        payload.projectInterested = payload.projectInterested || project.title;
        if (!projectImage) projectImage = project.thumbnail || project.galleryImages?.[0] || '';
      }
    }

    if (payload.offerId) {
      const offer = await Offer.findById(payload.offerId).select('title projectId bannerImage').catch(() => null);
      if (offer) {
        payload.offerTitle = payload.offerTitle || offer.title;
        offerImage = offer.bannerImage || '';
        if (!payload.projectId && offer.projectId) {
          payload.projectId = offer.projectId;
          const project = await Project.findById(offer.projectId).select('title thumbnail galleryImages').catch(() => null);
          if (project) {
            payload.projectInterested = payload.projectInterested || project.title;
            if (!projectImage) projectImage = project.thumbnail || project.galleryImages?.[0] || '';
          }
        }
      }
    }

    const lead = await Lead.create(payload);
    console.log('Lead created, imageUrl:', projectImage || offerImage || 'none');
    sendLeadEmails(lead, { projectImage, offerImage, offerDiscount }).catch(() => {});
    res.status(201).json({ success: true, lead });
  } catch (err) { next(err); }
};

// PATCH /api/leads/:id/status  (admin)
exports.updateStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true }
    );
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (err) { next(err); }
};

// DELETE /api/leads/:id  (admin)
exports.remove = async (req, res, next) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) { next(err); }
};

// GET /api/leads/export  (admin — CSV)
exports.exportCSV = async (req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).select('-__v -notes');
    const header = 'Name,Phone,Email,Project,Offer,Source,Status,Date';
    const rows = leads.map((l) =>
      [l.name, l.phone, l.email || '', l.projectInterested || '', l.offerTitle || '', l.source, l.status,
       new Date(l.createdAt).toLocaleDateString('en-IN')].join(',')
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send([header, ...rows].join('\n'));
  } catch (err) { next(err); }
};
