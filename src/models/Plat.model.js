const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const platSchema = Schema(
  {
    nom: { type: String, trim: true, required: true },
    prix: { type: Number, trim: true, required: true },
    delais: { type: Number, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    promo: { type: Boolean, required: true, default: false },
    disable: { type: Boolean, required: true, default: false },
    image: String,
    autresImages: [{ type: String }],
    commande: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commande' }],
    ets: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ets' },
      nom: { type: String, required: true },
    },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    slug: { type: String },
  },
  { timestamps: true }
);

module.exports = model('Plat', platSchema);
