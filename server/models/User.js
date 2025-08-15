const mongoose = require('mongoose');

const SavedSchemeSchema = new mongoose.Schema(
  {
    schemeId: { type: String, required: true }, // string to fit either numeric or uuid ids
    name: { type: String, required: true }, // display name
    link: { type: String },
    savedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const AppliedSchemeSchema = new mongoose.Schema(
  {
    schemeId: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String },
    status: {
      type: String,
      enum: ['saved', 'applied', 'in_progress', 'approved', 'rejected'],
      default: 'applied'
    },
    appliedAt: { type: Date, default: Date.now },
    lastUpdatedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },

    savedSchemes: { type: [SavedSchemeSchema], default: [] },
    appliedSchemes: { type: [AppliedSchemeSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);