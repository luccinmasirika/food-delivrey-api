const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const listRougeSchema = Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    livreur: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    commande: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commande' }],
  },
  { timestamps: true }
);

module.exports = model('ListRouge', listRougeSchema);
