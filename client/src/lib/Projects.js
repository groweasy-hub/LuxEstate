const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:5001/api";

// ── Static fallback data (used when API is unreachable) ────────────────────────
const FALLBACK_PROJECTS = [
  {
    id: "skyline-residences",
    dbId: "skyline-residences",
    slug: "skyline-residences",
    title: "Skyline Residences",
    location: "Jubilee Hills",
    address: "Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    type: "Apartment",
    status: "under-construction",
    badge: "New Launch",
    beds: [3, 4],
    area: "2,400 sq.ft",
    areaRange: "2,200 – 4,500 sq.ft",
    areaValue: 2400,
    builder: "Prestige Group",
    priceLabel: "₹2.8 Cr",
    priceRange: "₹2.8 Cr – ₹5.5 Cr",
    priceValue: 28000000,
    possession: "Mar 2025",
    rera: "P02400012345",
    unitsLeft: 5,
    img: "/images/project-1.jpg",
    images: ["/images/project-1.jpg", "/images/project-2.jpg", "/images/project-3.jpg"],
    description: "Skyline Residences is a landmark development offering ultra-luxury 3 & 4 BHK apartments in the heart of Jubilee Hills.",
    highlights: ["24/7 concierge services", "RERA approved", "Smart home automation", "Rooftop infinity pool"],
    amenities: [
      { icon: "pool", label: "Infinity Pool" },
      { icon: "gym", label: "Fitness Center" },
      { icon: "club", label: "Clubhouse" },
      { icon: "kids", label: "Kids' Play" },
      { icon: "ev", label: "EV Charging" },
      { icon: "security", label: "3-Tier Security" },
    ],
    floorPlans: [
      { type: "3 BHK", area: "2,200 sq.ft", price: "₹2.8 Cr", img: "" },
      { type: "4 BHK", area: "3,600 sq.ft", price: "₹4.5 Cr", img: "" },
    ],
    priceRows: [
      { config: "3 BHK", area: "2,200", floor: "5–15", price: "₹2.8 Cr", status: "Available" },
      { config: "4 BHK", area: "3,600", floor: "20–35", price: "₹4.5 Cr", status: "Limited" },
    ],
    configurations: [],
    landmarks: [
      { name: "Jubilee Hills Metro", distance: "5 min", category: "transport", icon: "metro" },
      { name: "Apollo Hospital", distance: "10 min", category: "healthcare", icon: "default" },
    ],
    specs: {},
    builderInfo: {
      name: "Prestige Group",
      logo: "",
      description: "Prestige Group is one of India's foremost real estate developers with over 35 years of experience.",
      yearsExp: "35+",
      projectsDelivered: "120+",
      happyFamilies: "50,000+",
      awards: "30+",
      rera: "PGH-2024-001",
    },
    mapEmbedUrl: "",
    createdAt: 1700000000000,
  },
  {
    id: "emerald-villas",
    dbId: "emerald-villas",
    slug: "emerald-villas",
    title: "Emerald Villas",
    location: "Gachibowli",
    address: "Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    type: "Villa",
    status: "ready",
    badge: null,
    beds: [4, 5],
    area: "3,800 sq.ft",
    areaRange: "3,800 – 5,200 sq.ft",
    areaValue: 3800,
    builder: "Sobha Developers",
    priceLabel: "₹4.2 Cr",
    priceRange: "₹4.2 Cr – ₹7.8 Cr",
    priceValue: 42000000,
    possession: "Dec 2026",
    rera: "P02400054321",
    unitsLeft: 12,
    img: "/images/project-2.jpg",
    images: ["/images/project-2.jpg", "/images/project-3.jpg"],
    description: "Emerald Villas offers premium 4 & 5 BHK villas in the heart of Gachibowli with world-class amenities.",
    highlights: ["Private pool option", "Gated community", "EV charging", "Tennis court"],
    amenities: [
      { icon: "pool", label: "Private Pool" },
      { icon: "gym", label: "Gym" },
      { icon: "security", label: "Gated Security" },
      { icon: "tennis", label: "Tennis Court" },
    ],
    floorPlans: [
      { type: "4 BHK Villa", area: "3,800 sq.ft", price: "₹4.2 Cr", img: "" },
      { type: "5 BHK Villa", area: "5,200 sq.ft", price: "₹6.5 Cr", img: "" },
    ],
    priceRows: [
      { config: "4 BHK Villa", area: "3,800", floor: "G+1", price: "₹4.2 Cr", status: "Available" },
      { config: "5 BHK Villa", area: "5,200", floor: "G+2", price: "₹6.5 Cr", status: "Limited" },
    ],
    configurations: [],
    landmarks: [],
    specs: {},
    builderInfo: {
      name: "Sobha Developers",
      logo: "",
      description: "Sobha Developers is known for delivering premium quality homes across India.",
      yearsExp: "28+",
      projectsDelivered: "90+",
      happyFamilies: "28,000+",
      awards: "20+",
      rera: "",
    },
    mapEmbedUrl: "",
    createdAt: 1710000000000,
  },
  {
    id: "azure-heights",
    dbId: "azure-heights",
    slug: "azure-heights",
    title: "Azure Heights",
    location: "Whitefield",
    address: "Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    type: "Apartment",
    status: "ready",
    badge: null,
    beds: [2, 3],
    area: "1,450 sq.ft",
    areaRange: "1,200 – 1,600 sq.ft",
    areaValue: 1450,
    builder: "Brigade Group",
    priceLabel: "₹1.2 Cr",
    priceRange: "₹1.2 Cr – ₹2.4 Cr",
    priceValue: 12000000,
    possession: "Ready",
    rera: "PR/150923/001234",
    unitsLeft: 18,
    img: "/images/project-3.jpg",
    images: ["/images/project-3.jpg", "/images/project-1.jpg"],
    description: "Azure Heights offers premium 2 & 3 BHK apartments in Whitefield, Bangalore's most sought-after IT corridor.",
    highlights: ["Swimming pool", "Gym", "Kids' zone", "Jogging track"],
    amenities: [
      { icon: "pool", label: "Swimming Pool" },
      { icon: "gym", label: "Gym" },
      { icon: "kids", label: "Kids' Zone" },
      { icon: "club", label: "Clubhouse" },
    ],
    floorPlans: [
      { type: "2 BHK", area: "1,200 sq.ft", price: "₹1.2 Cr", img: "" },
      { type: "3 BHK", area: "1,600 sq.ft", price: "₹1.8 Cr", img: "" },
    ],
    priceRows: [
      { config: "2 BHK", area: "1,200", floor: "1–10", price: "₹1.2 Cr", status: "Available" },
      { config: "3 BHK", area: "1,600", floor: "5–15", price: "₹1.8 Cr", status: "Available" },
    ],
    configurations: [],
    landmarks: [],
    specs: {},
    builderInfo: {
      name: "Brigade Group",
      logo: "",
      description: "Brigade Group has been delivering quality homes across South India for over 30 years.",
      yearsExp: "30+",
      projectsDelivered: "200+",
      happyFamilies: "40,000+",
      awards: "",
      rera: "",
    },
    mapEmbedUrl: "",
    createdAt: 1695000000000,
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
    console.error(`Project data fetch failed for ${path}:`, error);
    return null;
  }
}

function formatPropertyType(type) {
  if (!type) return "";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function pickAreaValue(project) {
  if (typeof project.areaValue === "number") return project.areaValue;

  const source =
    project.areaRange ||
    project.area ||
    project.floorPlans?.[0]?.area ||
    project.configurations?.[0]?.area ||
    "";
  const match = String(source).match(/\d[\d,]*/);

  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

function normalizeMediaUrl(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMediaList(values = []) {
  return [...new Set(values.map(normalizeMediaUrl).filter(Boolean))];
}

export function normalizeProject(project = {}) {
  const location = project.location || {};
  const pricing = project.pricing || {};
  const builderInfo = project.builderInfo || {};
  const thumbnail = normalizeMediaUrl(project.thumbnail);
  const galleryImages = normalizeMediaList([
    thumbnail,
    ...(project.galleryImages || []),
  ]);
  const bedOptions =
    Array.isArray(project.bedOptions) && project.bedOptions.length
      ? project.bedOptions
      : typeof project.beds === "number"
        ? [project.beds]
        : [];

  return {
    id: project.slug || project._id || "",
    dbId: project._id || "",
    slug: project.slug || "",
    title: project.title || "",
    location: location.area || location.address || location.city || "",
    address: location.address || "",
    city: location.city || "",
    state: location.state || "",
    type: formatPropertyType(project.propertyType),
    status: project.status || "",
    badge: project.badge || null,
    beds: bedOptions.length === 1 ? bedOptions[0] : bedOptions,
    area: project.area || project.areaRange || project.floorPlans?.[0]?.area || "",
    areaRange: project.areaRange || project.area || "",
    areaValue: pickAreaValue(project),
    builder: project.builderName || builderInfo.name || "",
    priceLabel: pricing.priceLabel || "",
    priceRange: pricing.priceRange || pricing.priceLabel || "",
    priceValue: pricing.minPrice || 0,
    possession: project.possession || "",
    rera: project.rera || "",
    unitsLeft: project.unitsLeft || 0,
    img: thumbnail || galleryImages[0] || "",
    images: galleryImages,
    description: project.description || "",
    pricingNote: project.pricingNote || "",
    highlights: (project.highlights || [])
      .map((item) => (typeof item === "string" ? item : item?.label))
      .filter(Boolean),
    amenities: (project.amenities || []).map((item) => ({
      icon: item.icon || "default",
      label: item.label || "",
    })),
    floorPlans: (project.floorPlans || []).map((plan) => ({
      type: plan.type || "",
      area: plan.area || "",
      price: plan.price || "",
      img: normalizeMediaUrl(plan.img),
    })),
    priceRows: (project.priceTable || []).map((row) => ({
      config: row.config || "",
      area: row.area || "",
      floor: row.floor || "",
      price: row.price || "",
      status: row.status || "Available",
    })),
    configurations: project.configurations || [],
    landmarks: project.landmarks || [],
    specs: project.specs || {},
    builderInfo: {
      name: builderInfo.name || project.builderName || "",
      logo: normalizeMediaUrl(builderInfo.logo || project.builderLogo),
      description: builderInfo.description || project.builderDesc || "",
      yearsExp: builderInfo.yearsExp || "",
      projectsDelivered: builderInfo.projectsDelivered || "",
      happyFamilies: builderInfo.happyFamilies || "",
      awards: builderInfo.awards || "",
      rera: builderInfo.rera || "",
    },
    mapEmbedUrl: project.mapEmbedUrl || project.mapUrl || "",
    createdAt: project.createdAt ? new Date(project.createdAt).getTime() : 0,
  };
}

export async function getAllProjects() {
  const data = await fetchJson("projects", { limit: 100 });
  if (!data) return FALLBACK_PROJECTS;
  return (data?.items || []).map(normalizeProject);
}

export async function getFeaturedProjects(limit = 3) {
  const data = await fetchJson("projects/featured");
  if (!data) return FALLBACK_PROJECTS.slice(0, limit);
  return (data?.items || []).map(normalizeProject).slice(0, limit);
}

export async function getProjectById(id) {
  const data = await fetchJson(`projects/${id}`);
  if (!data) return FALLBACK_PROJECTS.find((p) => p.id === id) || null;
  return data?.project ? normalizeProject(data.project) : null;
}

export async function getRelatedProjects(id, limit = 6) {
  const [current, projects] = await Promise.all([
    getProjectById(id),
    getAllProjects(),
  ]);

  if (!current) return [];

  return projects
    .filter(
      (project) =>
        project.id !== current.id &&
        (project.city === current.city || project.type === current.type)
    )
    .slice(0, limit);
}
