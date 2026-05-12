const Project = require('../models/Project');

// GET /api/projects
exports.getAll = async (req, res, next) => {
  try {
    const { city, type, status, featured, search, page = 1, limit = 12 } = req.query;
    const query = {};

    if (city && city !== 'All')     query['location.city'] = city;
    if (type && type !== 'All')     query.propertyType = type.toLowerCase();
    if (status && status !== 'All') query.status = status;
    if (featured === 'true')        query.featured = true;
    if (search) query.$or = [
      { title:       { $regex: search, $options: 'i' } },
      { builderName: { $regex: search, $options: 'i' } },
      { 'location.city': { $regex: search, $options: 'i' } },
    ];

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Project.countDocuments(query);
    const items = await Project.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), items });
  } catch (err) { next(err); }
};

// GET /api/projects/featured
exports.getFeatured = async (req, res, next) => {
  try {
    const items = await Project.find({ featured: true, showOnHomepage: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .select('title slug location pricing propertyType status badge thumbnail beds area builderName');
    res.json({ success: true, items });
  } catch (err) { next(err); }
};

// GET /api/projects/:id
exports.getOne = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      $or: [
        { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null },
        { slug: req.params.id },
      ],
    }).select('-__v');
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) { next(err); }
};

// GET /api/projects/:id/related
exports.getRelated = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      $or: [
        { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null },
        { slug: req.params.id },
      ],
    }).select('location.city propertyType pricing.minPrice');
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const items = await Project.find({
      _id: { $ne: project._id },
      $or: [
        { 'location.city': project.location.city },
        { propertyType: project.propertyType },
      ],
    })
      .limit(3)
      .select('title slug location pricing propertyType status badge thumbnail beds area builderName');

    res.json({ success: true, items });
  } catch (err) { next(err); }
};

// POST /api/projects  (admin)
exports.create = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, project });
  } catch (err) { next(err); }
};

// PUT /api/projects/:id  (admin)
exports.update = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) { next(err); }
};

// DELETE /api/projects/:id  (admin)
exports.remove = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};
