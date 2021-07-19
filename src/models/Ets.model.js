const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const etsSchema = Schema(
  {
    nom: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: String,
    heure: [{ type: String, trim: true, required: true }],
    coordonnees: [{ type: String, trim: true, required: true }],
    disable: { type: Boolean, default: false },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  },
  { timestamps: true }
);

module.exports = model('Ets', etsSchema);
