const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const userSchema = Schema(
  {
    email: String,
    telephone: String,
    idPiece: String,
    firstName: { type: String, trim: true, required: true },
    role: { type: Number, enum: [0, 1, 2, 3] },
    hashed_password: { type: String, required: true },
    lastName: { type: String, trim: true, required: true },
    avatar: String,
    photoCarte: String,
    sexe: { type: String, trim: true },
    disable: { type: Boolean, default: false },
    adresse: { type: String, trim: true },
    ets: { type: mongoose.Schema.Types.ObjectId, ref: 'Ets' },
    commande: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commande' }],
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
