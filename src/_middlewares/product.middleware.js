const Product = require('../models/Product.model');

// Get Product by slug from params
exports.getProductBySLUG = async (req, res, next, slug) => {
  try {
    const product = await Product.findOne({ slug }).exec();
    if (!product) return res.status(400).json({ error: "Le produit n'existe pas" });
    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
};
