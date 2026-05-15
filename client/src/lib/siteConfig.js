export const SITE_CONFIG = {
  brandName: "PropertyPerks",
  brandTagline: "Premium Real Estate",
  sinceYear: "2024",
  rightsYear: "2026",
  phoneDisplay: "+91 9963296848",
  phoneDigits: "919963296848",
  phoneHref: "tel:+919963296848",
  email: "propertperks.in@gmail.com",
  emailHref: "mailto:propertperks.in@gmail.com",
  addressLines: ["PropertyPerks", "10th Floor, City One", "Begumpet, Hyderabad"],
  addressInline: "PropertyPerks, 10th Floor, City One, Begumpet, Hyderabad",
};

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.addressInline)}&output=embed`;

export function buildWhatsAppUrl(
  message = "Hi, I'm interested in PropertyPerks. Can you help me?",
) {
  return `https://wa.me/${SITE_CONFIG.phoneDigits}?text=${encodeURIComponent(message)}`;
}
