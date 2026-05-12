const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    email:   { type: String, trim: true, lowercase: true },
    message: { type: String },

    projectInterested: { type: String },
    projectId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    offerTitle:        { type: String, trim: true },
    offerId:           { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },

    source: {
      type: String,
      enum: ['homepage_hero', 'project_detail', 'offer_claim', 'contact_page', 'whatsapp_cta', 'other'],
      default: 'other',
    },

    status: {
      type: String,
      enum: ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'],
      default: 'New',
    },

    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
