const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMethodSchema = new Schema(
  {
    coffee: {
      name: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      roast: {
        type: String,
      },
    },
    method_used: {
      type: String,
      required: true,
    },
    ratio: {
      type: Number,
      required: true,
      min: 1,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
    liked: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.add({
  brews: [userMethodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
