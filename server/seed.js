require('dotenv').config();
const connectDB = require('./config/db');
const ensureDefaultAdmin = require('./utils/ensureDefaultAdmin');

const Project = require('./models/Project');
const Offer = require('./models/Offer');

const PROJECTS = [
  {
    title: 'The Pinnacle Residences',
    slug: 'the-pinnacle-residences',
    builderName: 'Lodha Group',
    builderDesc:
      "Lodha Group is one of India's best-known luxury real estate developers with a strong track record in premium residential communities.",
    builderLogo: '/images/lodha.png',
    builderInfo: {
      name: 'Lodha Group',
      logo: '/images/lodha.png',
      description:
        "Lodha Group has delivered landmark residential and mixed-use developments across India's prime urban markets.",
      yearsExp: '40+',
      projectsDelivered: '95+',
      happyFamilies: '55,000+',
      awards: '35+',
      rera: 'LODHA-RERA-001',
    },
    location: {
      address: 'Plot 14, Turner Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      area: 'Bandra West',
    },
    pricing: {
      minPrice: 42000000,
      maxPrice: 68000000,
      priceLabel: 'Rs. 4.2 Cr',
      priceRange: 'Rs. 4.2 Cr - Rs. 6.8 Cr',
    },
    propertyType: 'apartment',
    status: 'ready',
    badge: 'Featured',
    featured: true,
    showOnHomepage: true,
    thumbnail: '/images/project-1.jpg',
    galleryImages: [
      '/images/project-1.jpg',
      '/images/project-2.jpg',
      '/images/project-3.jpg',
    ],
    floorPlans: [
      { type: '2 BHK', area: '1200 sq.ft', price: 'Rs. 3.1 Cr', img: '/images/project-1.jpg' },
      { type: '3 BHK', area: '1850 sq.ft', price: 'Rs. 4.2 Cr', img: '/images/project-2.jpg' },
      { type: '4 BHK', area: '2800 sq.ft', price: 'Rs. 6.8 Cr', img: '/images/project-3.jpg' },
    ],
    description:
      'The Pinnacle Residences brings sea-facing luxury living to Bandra West with spacious layouts, signature amenities, and immediate possession inventory.',
    highlights: [
      { label: 'Sea view residences', icon: 'view' },
      { label: 'Smart home enabled apartments', icon: 'smart-home' },
      { label: 'Ready to move inventory', icon: 'ready' },
      { label: 'Private clubhouse and wellness floor', icon: 'club' },
    ],
    amenities: [
      { label: 'Infinity Pool', icon: 'pool' },
      { label: 'Gym and Spa', icon: 'gym' },
      { label: 'Concierge', icon: 'concierge' },
      { label: '24/7 Security', icon: 'security' },
      { label: 'Sky Lounge', icon: 'roof' },
      { label: 'Kids Play Zone', icon: 'kids' },
    ],
    configurations: [
      { type: '2 BHK', area: '1200 sq.ft', price: 'Rs. 3.1 Cr' },
      { type: '3 BHK', area: '1850 sq.ft', price: 'Rs. 4.2 Cr' },
      { type: '4 BHK', area: '2800 sq.ft', price: 'Rs. 6.8 Cr' },
    ],
    priceTable: [
      { config: '2 BHK', area: '1200 sq.ft', floor: '5-20', price: 'Rs. 3.1 Cr', status: 'Available' },
      { config: '3 BHK', area: '1850 sq.ft', floor: '10-35', price: 'Rs. 4.2 Cr', status: 'Limited' },
      { config: '4 BHK', area: '2800 sq.ft', floor: '30-42', price: 'Rs. 6.8 Cr', status: 'Sold Out' },
    ],
    landmarks: [
      { name: 'Bandra Railway Station', distance: '8 min', category: 'transport', icon: 'default' },
      { name: 'BKC Business District', distance: '15 min', category: 'transport', icon: 'default' },
      { name: 'Lilavati Hospital', distance: '10 min', category: 'healthcare', icon: 'default' },
      { name: 'Linking Road Retail Hub', distance: '6 min', category: 'entertainment', icon: 'mall' },
      { name: 'Dhirubhai Ambani School', distance: '18 min', category: 'education', icon: 'default' },
    ],
    specs: {
      Structure: [
        { label: 'Structure', value: 'RCC framed structure' },
        { label: 'Floors', value: '42 floors' },
        { label: 'Total Units', value: '280 residences' },
      ],
      Interiors: [
        { label: 'Living', value: 'Imported marble flooring' },
        { label: 'Bedrooms', value: 'Engineered wood flooring' },
        { label: 'Bathrooms', value: 'Premium sanitary fittings' },
      ],
      Electrical: [
        { label: 'Power Backup', value: '100% backup for common areas and lifts' },
        { label: 'Smart Home', value: 'Lighting and access control automation' },
      ],
    },
    beds: 3,
    bedOptions: [2, 3, 4],
    baths: 3,
    area: '1850 sq.ft',
    areaRange: '1200 - 2800 sq.ft',
    areaValue: 1850,
    floors: 42,
    totalUnits: 280,
    unitsLeft: 12,
    possession: 'Ready to Move',
    rera: 'P51900012345',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Turner%20Road%20Bandra%20West%20Mumbai&output=embed',
    seo: {
      title: 'The Pinnacle Residences | Luxury Apartments in Bandra West',
      description: 'Premium 2, 3 and 4 BHK residences in Bandra West by Lodha Group.',
    },
  },
  {
    title: 'Emerald Heights',
    slug: 'emerald-heights',
    builderName: 'Hiranandani',
    builderDesc:
      "Hiranandani has shaped integrated communities and high-value residential developments across India's major metros.",
    builderLogo: '/images/hiranandani.png',
    builderInfo: {
      name: 'Hiranandani',
      logo: '/images/hiranandani.png',
      description:
        'Hiranandani is known for well-planned townships, premium amenities, and long-term value appreciation in established micro-markets.',
      yearsExp: '35+',
      projectsDelivered: '80+',
      happyFamilies: '42,000+',
      awards: '28+',
      rera: 'HIRA-RERA-112',
    },
    location: {
      address: 'Hiranandani Gardens',
      city: 'Mumbai',
      state: 'Maharashtra',
      area: 'Powai',
    },
    pricing: {
      minPrice: 28000000,
      maxPrice: 45000000,
      priceLabel: 'Rs. 2.8 Cr',
      priceRange: 'Rs. 2.8 Cr - Rs. 4.5 Cr',
    },
    propertyType: 'apartment',
    status: 'ready',
    badge: 'New',
    featured: true,
    showOnHomepage: true,
    thumbnail: '/images/project-2.jpg',
    galleryImages: [
      '/images/project-2.jpg',
      '/images/project-3.jpg',
      '/images/project-1.jpg',
    ],
    floorPlans: [
      { type: '2 BHK', area: '1200 sq.ft', price: 'Rs. 2.8 Cr', img: '/images/project-2.jpg' },
      { type: '3 BHK', area: '1650 sq.ft', price: 'Rs. 3.9 Cr', img: '/images/project-3.jpg' },
    ],
    description:
      'Emerald Heights offers township living in Powai with lake-facing towers, family-centric amenities, and excellent access to major business districts.',
    highlights: [
      { label: 'Lake-facing apartments', icon: 'lake' },
      { label: 'Located inside an integrated township', icon: 'township' },
      { label: 'Strong ready inventory', icon: 'ready' },
      { label: 'Close to schools, malls, and hospitals', icon: 'connectivity' },
    ],
    amenities: [
      { label: 'Swimming Pool', icon: 'pool' },
      { label: 'Gymnasium', icon: 'gym' },
      { label: '24/7 Security', icon: 'security' },
      { label: 'Clubhouse', icon: 'club' },
      { label: 'Jogging Track', icon: 'jog' },
      { label: 'Kids Play Area', icon: 'kids' },
    ],
    configurations: [
      { type: '2 BHK', area: '1200 sq.ft', price: 'Rs. 2.8 Cr' },
      { type: '3 BHK', area: '1650 sq.ft', price: 'Rs. 3.9 Cr' },
    ],
    priceTable: [
      { config: '2 BHK', area: '1200 sq.ft', floor: '3-15', price: 'Rs. 2.8 Cr', status: 'Available' },
      { config: '3 BHK', area: '1650 sq.ft', floor: '10-28', price: 'Rs. 3.9 Cr', status: 'Limited' },
    ],
    landmarks: [
      { name: 'Powai Lake', distance: '4 min', category: 'entertainment', icon: 'default' },
      { name: 'JVLR Corridor', distance: '9 min', category: 'transport', icon: 'default' },
      { name: 'Hiranandani Hospital', distance: '7 min', category: 'healthcare', icon: 'default' },
      { name: 'Galleria Mall', distance: '5 min', category: 'entertainment', icon: 'mall' },
      { name: 'IIT Bombay', distance: '11 min', category: 'education', icon: 'default' },
    ],
    specs: {
      Structure: [
        { label: 'Structure', value: 'Earthquake-resistant RCC frame' },
        { label: 'Floors', value: '28 floors' },
        { label: 'Total Units', value: '180 residences' },
      ],
      Kitchens: [
        { label: 'Countertop', value: 'Granite counter with stainless sink' },
        { label: 'Cabinets', value: 'Modular storage with utility provision' },
      ],
      Lifestyle: [
        { label: 'Township Access', value: 'Retail, schools, and recreation within walking distance' },
        { label: 'Parking', value: 'Reserved basement parking' },
      ],
    },
    beds: 2,
    bedOptions: [2, 3],
    baths: 2,
    area: '1200 sq.ft',
    areaRange: '1200 - 1650 sq.ft',
    areaValue: 1200,
    floors: 28,
    totalUnits: 180,
    unitsLeft: 24,
    possession: 'Ready to Move',
    rera: 'P51900023456',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Powai%20Mumbai&output=embed',
    seo: {
      title: 'Emerald Heights | Apartments in Powai',
      description: 'Ready 2 and 3 BHK apartments in Powai by Hiranandani.',
    },
  },
  {
    title: 'Azure Sky Towers',
    slug: 'azure-sky-towers',
    builderName: 'Oberoi Realty',
    builderDesc:
      'Oberoi Realty develops high-end residences with sharp design quality, strong execution, and prime city positioning.',
    builderLogo: '/images/oberoi.png',
    builderInfo: {
      name: 'Oberoi Realty',
      logo: '/images/oberoi.png',
      description:
        'Oberoi Realty is recognized for premium address creation, refined finishes, and luxury residential towers in high-demand urban corridors.',
      yearsExp: '25+',
      projectsDelivered: '45+',
      happyFamilies: '18,000+',
      awards: '20+',
      rera: 'OBER-RERA-209',
    },
    location: {
      address: 'Dr. Annie Besant Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      area: 'Worli',
    },
    pricing: {
      minPrice: 75000000,
      maxPrice: 180000000,
      priceLabel: 'Rs. 7.5 Cr',
      priceRange: 'Rs. 7.5 Cr - Rs. 18 Cr',
    },
    propertyType: 'penthouse',
    status: 'under-construction',
    badge: 'Featured',
    featured: true,
    showOnHomepage: true,
    thumbnail: '/images/project-3.jpg',
    galleryImages: [
      '/images/project-3.jpg',
      '/images/project-1.jpg',
      '/images/project-2.jpg',
    ],
    floorPlans: [
      { type: '3 BHK', area: '2400 sq.ft', price: 'Rs. 7.5 Cr', img: '/images/project-3.jpg' },
      { type: '4 BHK', area: '3200 sq.ft', price: 'Rs. 10 Cr', img: '/images/project-1.jpg' },
      { type: 'Penthouse', area: '6000 sq.ft', price: 'Rs. 18 Cr', img: '/images/project-2.jpg' },
    ],
    description:
      'Azure Sky Towers is an ultra-luxury Worli address with private lift lobbies, sea-link views, and limited signature residences under development.',
    highlights: [
      { label: 'Sea Link and Arabian Sea views', icon: 'view' },
      { label: 'Private elevator access', icon: 'lift' },
      { label: 'Premium sky amenities', icon: 'sky' },
      { label: 'Luxury under-construction inventory', icon: 'construction' },
    ],
    amenities: [
      { label: 'Sky Pool', icon: 'pool' },
      { label: 'Spa and Wellness', icon: 'gym' },
      { label: 'Concierge', icon: 'concierge' },
      { label: 'Biometric Security', icon: 'security' },
      { label: 'Business Lounge', icon: 'biz' },
      { label: 'Private Theatre', icon: 'theatre' },
    ],
    configurations: [
      { type: '3 BHK', area: '2400 sq.ft', price: 'Rs. 7.5 Cr' },
      { type: '4 BHK', area: '3200 sq.ft', price: 'Rs. 10 Cr' },
      { type: 'Penthouse', area: '6000 sq.ft', price: 'Rs. 18 Cr' },
    ],
    priceTable: [
      { config: '3 BHK', area: '2400 sq.ft', floor: '10-40', price: 'Rs. 7.5 Cr', status: 'Available' },
      { config: '4 BHK', area: '3200 sq.ft', floor: '40-60', price: 'Rs. 10 Cr', status: 'Limited' },
      { config: 'Penthouse', area: '6000 sq.ft', floor: '61-65', price: 'Rs. 18 Cr', status: 'Limited' },
    ],
    landmarks: [
      { name: 'Bandra-Worli Sea Link', distance: '6 min', category: 'transport', icon: 'default' },
      { name: 'Lower Parel Business District', distance: '12 min', category: 'transport', icon: 'default' },
      { name: 'Palladium Mall', distance: '10 min', category: 'entertainment', icon: 'mall' },
      { name: 'Breach Candy Hospital', distance: '16 min', category: 'healthcare', icon: 'default' },
      { name: 'Cathedral School Extension Bus Stop', distance: '14 min', category: 'education', icon: 'default' },
    ],
    specs: {
      Structure: [
        { label: 'Structure', value: 'High-rise RCC tower with seismic design compliance' },
        { label: 'Floors', value: '65 floors' },
        { label: 'Total Units', value: '120 residences' },
      ],
      'Luxury Features': [
        { label: 'Lift Lobby', value: 'Private lift access for select residences' },
        { label: 'Facade', value: 'High-performance glass facade system' },
        { label: 'Ceiling Height', value: 'Premium double-height penthouse zones' },
      ],
      Security: [
        { label: 'Access', value: 'Biometric and smart visitor management' },
        { label: 'Monitoring', value: '24/7 CCTV and concierge desk' },
      ],
    },
    beds: 4,
    bedOptions: [3, 4],
    baths: 4,
    area: '3200 sq.ft',
    areaRange: '2400 - 6000 sq.ft',
    areaValue: 3200,
    floors: 65,
    totalUnits: 120,
    unitsLeft: 7,
    possession: 'Dec 2026',
    rera: 'P51900034567',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Dr%20Annie%20Besant%20Road%20Worli%20Mumbai&output=embed',
    seo: {
      title: 'Azure Sky Towers | Luxury Penthouses in Worli',
      description: 'Luxury 3 and 4 BHK residences with penthouses in Worli by Oberoi Realty.',
    },
  },
];

const OFFERS = [
  {
    title: 'The Pinnacle Pre-Launch Special',
    projectSlug: 'the-pinnacle-residences',
    badge: 'Pre-Launch',
    badgeType: 'gold',
    tag: 'Best Seller',
    discount: '12% OFF',
    oldPrice: 'Rs. 4.8 Cr',
    newPrice: 'Rs. 4.2 Cr',
    saving: 'Save Rs. 60 Lakh',
    offerText: 'Zero stamp duty plus free modular kitchen package',
    unitsLeft: 12,
    expiryHours: 47,
    active: true,
    featuredDeal: false,
    topOffer: false,
    currentDeal: true,
    bannerImage: '/images/project-1.jpg',
    features: ['3 BHK', '1850 sq.ft', 'Sea View', 'Ready to Move'],
  },
  {
    title: 'Emerald Heights Hot Deal',
    projectSlug: 'emerald-heights',
    badge: 'Limited',
    badgeType: 'red',
    tag: 'Hot Deal',
    discount: '8% OFF',
    oldPrice: 'Rs. 3.05 Cr',
    newPrice: 'Rs. 2.8 Cr',
    saving: 'Save Rs. 25 Lakh',
    offerText: 'No EMI for 12 months plus one free parking slot',
    unitsLeft: 24,
    expiryHours: 23,
    active: true,
    featuredDeal: false,
    topOffer: false,
    currentDeal: true,
    bannerImage: '/images/project-2.jpg',
    features: ['2 BHK', '1200 sq.ft', 'Lake View', 'Ready to Move'],
  },
  {
    title: 'Azure Sky Exclusive Pre-Launch',
    projectSlug: 'azure-sky-towers',
    badge: 'Pre-Launch',
    badgeType: 'gold',
    tag: 'Exclusive',
    discount: '15% OFF',
    oldPrice: 'Rs. 8.8 Cr',
    newPrice: 'Rs. 7.5 Cr',
    saving: 'Save Rs. 1.3 Cr',
    offerText: 'Pre-launch pricing with furnished interior upgrade option',
    unitsLeft: 7,
    expiryHours: 11,
    active: true,
    featuredDeal: true,
    topOffer: true,
    currentDeal: true,
    bannerImage: '/images/project-3.jpg',
    features: ['4 BHK', '3200 sq.ft', 'Sea Link View', 'Dec 2026'],
  },
];

function addHours(hours) {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

async function upsertProjects() {
  const projectMap = new Map();

  for (const projectData of PROJECTS) {
    const project = await Project.findOneAndUpdate(
      { slug: projectData.slug },
      { $set: projectData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    projectMap.set(project.slug, project);
  }

  return projectMap;
}

async function upsertOffers(projectMap) {
  const offers = [];

  for (const offerData of OFFERS) {
    const project = projectMap.get(offerData.projectSlug);
    if (!project) {
      throw new Error(`Missing project for offer seed: ${offerData.title}`);
    }

    const { projectSlug, expiryHours, ...offerFields } = offerData;
    const offer = await Offer.findOneAndUpdate(
      { title: offerData.title, projectId: project._id },
      {
        $set: {
          ...offerFields,
          projectId: project._id,
          expiryDate: addHours(expiryHours),
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    offers.push(offer);
  }

  return offers;
}

async function verifySeed(projectMap, offers) {
  const projectSlugs = [...projectMap.keys()];
  const seededProjects = await Project.find({ slug: { $in: projectSlugs } }).lean();
  const seededOffers = await Offer.find({ _id: { $in: offers.map((offer) => offer._id) } }).lean();

  const invalidProject = seededProjects.find(
    (project) =>
      !project.title ||
      !project.slug ||
      !project.builderName ||
      !project.location?.city ||
      !project.pricing?.minPrice ||
      !project.propertyType
  );

  const invalidOffer = seededOffers.find(
    (offer) =>
      !offer.title ||
      !offer.projectId ||
      !offer.discount ||
      !offer.oldPrice ||
      !offer.newPrice ||
      !offer.expiryDate
  );

  if (invalidProject) {
    throw new Error(`Project verification failed for slug: ${invalidProject.slug}`);
  }

  if (invalidOffer) {
    throw new Error(`Offer verification failed for title: ${invalidOffer.title}`);
  }

  return {
    projectCount: seededProjects.length,
    offerCount: seededOffers.length,
  };
}

async function seed() {
  await connectDB();

  const admin = await ensureDefaultAdmin();
  const projectMap = await upsertProjects();
  const offers = await upsertOffers(projectMap);
  const verification = await verifySeed(projectMap, offers);

  if (admin) {
    console.log(`Admin ready: ${admin.email}`);
  }
  console.log(`Projects upserted: ${verification.projectCount}`);
  console.log(`Offers upserted: ${verification.offerCount}`);
  console.log('Seed verification passed.');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
