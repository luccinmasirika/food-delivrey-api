const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const menuSchema = Schema(
  {
    nom: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: String,
    disable: { type: Boolean, default: false },
    slug: { type: String },
  },
  { timestamps: true }
);

module.exports = model('Menu', menuSchema);
