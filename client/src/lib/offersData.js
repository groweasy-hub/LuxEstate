const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:5001/api";

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
  return (data?.items || []).map(normalizeOffer);
}

export async function getFeaturedOffer() {
  const data = await fetchJson("offers/featured");
  return data?.offer ? normalizeOffer(data.offer) : null;
}
