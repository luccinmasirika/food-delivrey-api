const Category = require('../models/Category.model');

// Get category by slug from params
exports.getCategoryBySLUG = async (req, res, next, slug) => {
  try {
    const category = await Category.findOne({ slug }).exec();
    if (!category) return res.status(400).json({ error: "La catégorie n'existe pas" });
    req.category = category;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
};
