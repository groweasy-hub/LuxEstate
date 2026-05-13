const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:5001/api";

const FALLBACK_OFFERS = [
  {
    id: "offer-skyline-launch",
    projectId: "skyline-residences",
    projectDbId: "skyline-residences",
    projectTitle: "Skyline Residences",
    title: "Skyline Residences Launch Offer",
    location: "Jubilee Hills, Hyderabad",
    img: "/images/project-1.jpg",
    badge: "Featured Deal",
    badgeType: "gold",
    tag: "Exclusive",
    discount: "5% Launch Benefit",
    oldPrice: "₹2.95 Cr",
    newPrice: "₹2.80 Cr",
    saving: "Save up to ₹15 Lakhs",
    offer:
      "Zero brokerage, preferred inventory access, and a complimentary interior consultation for this week only.",
    unitsLeft: 4,
    expiresHours: 72,
    features: [
      "Zero brokerage",
      "Priority unit selection",
      "Complimentary design consultation",
    ],
  },
  {
    id: "offer-emerald-villas",
    projectId: "emerald-villas",
    projectDbId: "emerald-villas",
    projectTitle: "Emerald Villas",
    title: "Emerald Villas Premium Upgrade Deal",
    location: "Gachibowli, Hyderabad",
    img: "/images/project-2.jpg",
    badge: "Limited Offer",
    badgeType: "red",
    tag: "Ends Soon",
    discount: "Free Club Membership",
    oldPrice: "₹4.35 Cr",
    newPrice: "₹4.20 Cr",
    saving: "Premium benefits worth ₹10 Lakhs",
    offer:
      "Book now to unlock club membership, modular kitchen upgrade, and exclusive site-visit assistance.",
    unitsLeft: 6,
    expiresHours: 48,
    features: [
      "Club membership included",
      "Kitchen upgrade package",
      "Assisted site visit",
    ],
  },
  {
    id: "offer-azure-heights",
    projectId: "azure-heights",
    projectDbId: "azure-heights",
    projectTitle: "Azure Heights",
    title: "Azure Heights Ready-to-Move Offer",
    location: "Whitefield, Bangalore",
    img: "/images/project-3.jpg",
    badge: "Ready to Move",
    badgeType: "green",
    tag: "Fast Closing",
    discount: "Registration Support",
    oldPrice: "₹1.30 Cr",
    newPrice: "₹1.20 Cr",
    saving: "Save up to ₹10 Lakhs",
    offer:
      "Special ready-to-move pricing with registration support and exclusive finance assistance.",
    unitsLeft: 8,
    expiresHours: 96,
    features: [
      "Registration support",
      "Finance assistance",
      "Ready-to-move inventory",
    ],
  },
];

function buildApiUrl(path, params = {}) {
  const base = API_BASE.endsWith("/") ? API_BASE : `${API_BASE}/`;
  const url = new URL(path, base);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

async function fetchJson(path, params) {
  try {
    const response = await fetch(buildApiUrl(path, params), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Offer data fetch failed for ${path}:`, error);
    return null;
  }
}

function formatLocation(project) {
  if (!project?.location) return "";

  const area = project.location.area || project.location.address || "";
  const city = project.location.city || "";

  return [area, city].filter(Boolean).join(", ");
}

function normalizeOffer(offer = {}) {
  const project = offer.projectId || {};

  return {
    id: offer._id || "",
    projectId: project.slug || project._id || "",
    projectDbId: project._id || "",
    projectTitle: project.title || "",
    title: offer.title || project.title || "",
    location: formatLocation(project),
    img: offer.bannerImage || project.thumbnail || "",
    badge: offer.badge || "",
    badgeType: offer.badgeType || "gold",
    tag: offer.tag || "",
    discount: offer.discount || "",
    oldPrice: offer.oldPrice || "",
    newPrice: offer.newPrice || "",
    saving: offer.saving || "",
    offer: offer.offerText || "",
    unitsLeft: offer.unitsLeft || 0,
    expiresHours:
      typeof offer.expiresHours === "number"
        ? offer.expiresHours
        : offer.expiryDate
          ? Math.max(
              0,
              Math.floor(
                (new Date(offer.expiryDate).getTime() - Date.now()) / 3600000
              )
            )
          : 0,
    features: offer.features || [],
  };
}

export async function getAllOffers() {
  const data = await fetchJson("offers", { active: true });
  if (!data?.items?.length) return FALLBACK_OFFERS;
  return data.items.map(normalizeOffer);
}

export async function getFeaturedOffer() {
  const data = await fetchJson("offers/featured");
  return data?.offer ? normalizeOffer(data.offer) : FALLBACK_OFFERS[0];
}
