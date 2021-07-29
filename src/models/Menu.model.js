const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const menuSchema = Schema(
  {
    nom: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: String,
    ets: { type: mongoose.Schema.Types.ObjectId, ref: 'Ets' },
    disable: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    plat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plat' }],
  },
  { timestamps: true }
);

const Menu = model('Menu', menuSchema);

const categorySchema = Schema(
  {
    nom: { type: String, trim: true, required: true },
    disable: { type: Boolean, default: false },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  },
  { timestamps: true }
);

const Category = model('Category', categorySchema);

module.exports = { Menu, Category };
