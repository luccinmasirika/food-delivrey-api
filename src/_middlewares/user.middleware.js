const User = require('../models/User.model');

// Get user by ID from params
exports.getUserByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) return res.status(400).json({ error: "L'utilisateur n'existe pas" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
};
