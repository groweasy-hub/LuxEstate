require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const connectDB    = require('./config/db');
const errorHandler = require('./middleware/error');
const ensureDefaultAdmin = require('./utils/ensureDefaultAdmin');

// Route imports
const authRoutes    = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const offerRoutes   = require('./routes/offers');
const leadRoutes    = require('./routes/leads');
const uploadRoutes  = require('./routes/upload');

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/offers',   offerRoutes);
app.use('/api/leads',    leadRoutes);
app.use('/api/upload',   uploadRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── Error handler ─────────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

async function startServer() {
  await connectDB();
  const defaultAdmin = await ensureDefaultAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (defaultAdmin) {
      console.log(`Default admin ready: ${defaultAdmin.email}`);
    }
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
