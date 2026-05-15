const Admin = require("../models/Admin");
const siteConfig = require("../config/siteConfig");

async function ensureDefaultAdmin() {
  const email = process.env.DEFAULT_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.DEFAULT_ADMIN_PASSWORD?.trim();
  const name = process.env.DEFAULT_ADMIN_NAME?.trim() || `${siteConfig.brandName} Admin`;
  const role = process.env.DEFAULT_ADMIN_ROLE?.trim() || "super_admin";

  if (!email || !password) {
    console.warn("Default admin bootstrap skipped: DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD is missing.");
    return null;
  }

  const existing = await Admin.findOne({ email });
  if (existing) return existing;

  return Admin.create({
    name,
    email,
    password,
    role,
  });
}

module.exports = ensureDefaultAdmin;
