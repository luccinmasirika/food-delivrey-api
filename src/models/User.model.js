const mongoose = require('mongoose');
const slugify = require('slugify');
const { model, Schema } = mongoose;

const userSchema = Schema(
  {
    email: { type: String, trim: true, unique: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    slug: { type: String, unique: true, index: true },
    role: { type: Number, enum: [0, 1, 2], default: 2 },
    avatar: String,
    telephone: { type: String, trim: true, unique: true },
    disable: { type: Boolean, default: false },
    hashed_password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
