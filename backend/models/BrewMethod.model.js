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
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ration: {
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

module.exports = brewMethodSchema;
