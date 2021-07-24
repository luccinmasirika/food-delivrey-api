const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const commandeSchema = Schema(
  {
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
    ets: { type: mongoose.Schema.Types.ObjectId, ref: 'Ets' },
    etat: {
      type: String,
      trim: true,
      required: true,
      default: 'PENDING_FOR_VALIDATION',
      enum: [
        'PENDING_FOR_VALIDATION',
        'VALIDATED',
        'DENIED',
        'PENDING_FOR_PAYMENT',
        'PAYIED',
        'CANCELED',
        'CLOSED',
      ],
    },
    reference: { type: String, trim: true, unique: true },
    adresse: {
      ville: { type: String, trim: true },
      adresse1: { type: String, trim: true },
      adresse2: { type: String, trim: true },
      localisation: {
        long: { type: String, trim: true },
        lat: { type: String, trim: true },
      },
    },
    livreur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number, required: true },
    prix: { type: Number, required: true },
  },
  { timestamps: true }
);

commandeSchema.pre('save', function (next) {
  this.reference = `#${
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  }`;
  next();
});

module.exports = model('Commande', commandeSchema);
