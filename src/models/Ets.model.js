const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const etsSchema = Schema(
  {
    nom: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: String,
    heure: {
      ouverture: { type: String, trim: true, required: true },
      fermeture: { type: String, trim: true, required: true },
    },
    localisation: {
      long: { type: String, trim: true, required: true },
      lat: { type: String, trim: true, required: true },
    },
    disable: { type: Boolean, default: false },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = model('Ets', etsSchema);
