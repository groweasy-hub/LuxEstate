const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true, trim: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },

    badge:     { type: String },
    badgeType: { type: String, enum: ['gold', 'red', 'green'], default: 'gold' },
    tag:       { type: String },

    discount:  { type: String, required: true },
    oldPrice:  { type: String, required: true },
    newPrice:  { type: String, required: true },
    saving:    { type: String },
    offerText: { type: String },

    unitsLeft:    { type: Number, default: 0 },
    expiryDate:   { type: Date, required: true },

    // Section controls
    active:       { type: Boolean, default: true },
    featuredDeal: { type: Boolean, default: false },
    topOffer:     { type: Boolean, default: false },
    currentDeal:  { type: Boolean, default: true },

    bannerImage:  { type: String },
    features:     { type: [String], default: [] },
  },
  { timestamps: true }
);

// Virtual: hours until expiry
offerSchema.virtual('expiresHours').get(function () {
  const diff = new Date(this.expiryDate) - new Date();
  return Math.max(0, Math.floor(diff / 3600000));
});

offerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Offer', offerSchema);
