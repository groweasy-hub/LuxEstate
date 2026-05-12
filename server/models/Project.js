const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  type:  { type: String },
  area:  { type: String },
  price: { type: String },
}, { _id: false });

const floorPlanSchema = new mongoose.Schema({
  type:  { type: String },
  area:  { type: String },
  price: { type: String },
  img:   { type: String },
}, { _id: false });

const priceRowSchema = new mongoose.Schema({
  config: { type: String },
  area:   { type: String },
  floor:  { type: String },
  price:  { type: String },
  status: { type: String, enum: ['Available', 'Limited', 'Sold Out'], default: 'Available' },
}, { _id: false });

const highlightSchema = new mongoose.Schema({
  label: { type: String },
  icon:  { type: String },
}, { _id: false });

const amenitySchema = new mongoose.Schema({
  label: { type: String },
  icon:  { type: String },
}, { _id: false });

const landmarkSchema = new mongoose.Schema({
  name:     { type: String },
  distance: { type: String },
  category: { type: String },
  icon:     { type: String },
}, { _id: false });

const builderInfoSchema = new mongoose.Schema({
  name:              { type: String },
  logo:              { type: String },
  description:       { type: String },
  yearsExp:          { type: String },
  projectsDelivered: { type: String },
  happyFamilies:     { type: String },
  awards:            { type: String },
  rera:              { type: String },
}, { _id: false });

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    builderName: { type: String, required: true, trim: true },
    builderDesc: { type: String },
    builderLogo: { type: String },

    location: {
      address: { type: String },
      city:    { type: String, required: true },
      state:   { type: String, default: 'Maharashtra' },
      area:    { type: String },
    },

    pricing: {
      minPrice:   { type: Number, required: true },
      maxPrice:   { type: Number },
      priceLabel: { type: String },
      priceRange: { type: String },
    },

    propertyType: {
      type: String,
      enum: ['apartment', 'villa', 'penthouse', 'plot'],
      required: true,
    },

    status: {
      type: String,
      enum: ['ready', 'under-construction', 'sold-out'],
      default: 'ready',
    },

    badge:       { type: String, enum: ['Featured', 'New', null], default: null },
    unitsLeft:   { type: Number, default: 0 },
    totalUnits:  { type: Number },
    floors:      { type: Number },
    possession:  { type: String },
    rera:        { type: String },

    // Homepage / section controls
    featured:      { type: Boolean, default: false },
    showOnHomepage:{ type: Boolean, default: true },

    // Media
    thumbnail:    { type: String },
    galleryImages:{ type: [String], default: [] },
    floorPlans:   { type: [floorPlanSchema], default: [] },
    brochurePdf:  { type: String },

    // Content
    description: { type: String },
    pricingNote: { type: String },
    highlights:  { type: [highlightSchema], default: [] },
    amenities:   { type: [amenitySchema], default: [] },
    configurations: { type: [configSchema], default: [] },
    priceTable:  { type: [priceRowSchema], default: [] },
    landmarks:   { type: [landmarkSchema], default: [] },
    specs:       { type: mongoose.Schema.Types.Mixed, default: {} },
    builderInfo: { type: builderInfoSchema, default: {} },

    // Specs
    beds:  { type: Number },
    bedOptions: { type: [Number], default: [] },
    baths: { type: Number },
    area:  { type: String },
    areaRange: { type: String },
    areaValue: { type: Number },

    mapUrl: { type: String },
    mapEmbedUrl: { type: String },

    seo: {
      title:       { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title if not provided
projectSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
