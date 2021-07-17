const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const configSchema = Schema(
  {
    devise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Devise' }],
    logo: String,
    icon: String,
    fraisParKm: [{ type: Number, trim: true, required: true }],
    rayonLimite: { type: Number, trim: true, required: true },
  },
  { timestamps: true }
);

const Config = model('Config', configSchema);

const deviseSchema = Schema({
  taux: { type: Number, trim: true, required: true },
  nom: { type: String, trim: true, required: true },
});

const Devise = model('Devise', deviseSchema);
module.exports = { Config, Devise };
