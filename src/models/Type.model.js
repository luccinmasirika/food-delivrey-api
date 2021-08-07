const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const typeSchema = Schema(
  {
    nom: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: String,
    disable: { type: Boolean, default: false },
    ets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ets' }],
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = model('Type', typeSchema);
