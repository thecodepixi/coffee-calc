const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewMethodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ratio: {
      type: Number,
      required: true,
    },
    guide: {
      type: String,
    },
    tips: [String],
  },
  {
    timestamps: true,
  }
);

const BrewMethod = mongoose.model('BrewMethod', brewMethodSchema);

module.exports = BrewMethod;
