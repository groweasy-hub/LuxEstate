const Offer = require('../models/Offer');
const Project = require('../models/Project');

// GET /api/offers
exports.getAll = async (req, res, next) => {
  try {
    const { active, featuredDeal, topOffer } = req.query;
    const query = {};
    if (active === 'true')       query.active = true;
    if (featuredDeal === 'true') query.featuredDeal = true;
    if (topOffer === 'true')     query.topOffer = true;

    const items = await Offer.find(query)
      .populate('projectId', 'title slug location thumbnail')
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({ success: true, items });
  } catch (err) { next(err); }
};

// GET /api/offers/featured
exports.getFeatured = async (req, res, next) => {
  try {
    const offer = await Offer.findOne({ featuredDeal: true, active: true })
      .populate('projectId', 'title slug location thumbnail')
      .select('-__v');
    res.json({ success: true, offer });
  } catch (err) { next(err); }
};

// GET /api/offers/:id
exports.getOne = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate('projectId', 'title slug location thumbnail')
      .select('-__v');
    if (!offer) return res.status(404).json({ success: false, message: 'Offer not found' });
    res.json({ success: true, offer });
  } catch (err) { next(err); }
};

// POST /api/offers  (admin)
exports.create = async (req, res, next) => {
  try {
    const project = await Project.findById(req.body.projectId).select('_id');
    if (!project) {
      return res.status(400).json({ success: false, message: 'Please select a valid project' });
    }

    const offer = await Offer.create(req.body);
    const populated = await Offer.findById(offer._id)
      .populate('projectId', 'title slug location thumbnail')
      .select('-__v');
    res.status(201).json({ success: true, offer: populated });
  } catch (err) { next(err); }
};

// PUT /api/offers/:id  (admin)
exports.update = async (req, res, next) => {
  try {
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId).select('_id');
      if (!project) {
        return res.status(400).json({ success: false, message: 'Please select a valid project' });
      }
    }

    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!offer) return res.status(404).json({ success: false, message: 'Offer not found' });
    const populated = await Offer.findById(offer._id)
      .populate('projectId', 'title slug location thumbnail')
      .select('-__v');
    res.json({ success: true, offer: populated });
  } catch (err) { next(err); }
};

// DELETE /api/offers/:id  (admin)
exports.remove = async (req, res, next) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Offer deleted' });
  } catch (err) { next(err); }
};
