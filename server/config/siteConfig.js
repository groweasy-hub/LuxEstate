const SITE_CONFIG = {
  brandName: "PropertyPerks",
  brandTagline: "Premium Real Estate",
  sinceYear: "2024",
  rightsYear: "2026",
  phoneDisplay: "+91 9963296848",
  phoneHref: "tel:+919963296848",
  email: process.env.SITE_EMAIL || process.env.ADMIN_EMAIL || "propertperks.in@gmail.com",
  addressLines: ["PropertyPerks", "10th Floor, City One", "Begumpet, Hyderabad"],
  addressInline: "PropertyPerks, 10th Floor, City One, Begumpet, Hyderabad",
};

module.exports = SITE_CONFIG;
