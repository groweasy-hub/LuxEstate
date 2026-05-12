const Admin = require('../models/Admin');
const jwt   = require('jsonwebtoken');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = signToken(admin._id);
    res.cookie('token', token, cookieOpts);
    res.json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) { next(err); }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out' });
};

// GET /api/auth/me
exports.me = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json({ success: true, admin });
  } catch (err) { next(err); }
};

// POST /api/auth/register  (first-time setup only — disable after use)
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.create({ name, email, password });
    const token = signToken(admin._id);
    res.cookie('token', token, cookieOpts);
    res.status(201).json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) { next(err); }
};
