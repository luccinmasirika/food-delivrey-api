const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

// Require signin to access on some pages
exports.requireSignin = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token)
    return res.status(401).json({ error: 'Acces denied. No token proveded' });
  try {
    const decoded = jwt.verify(
      token.split(' ')[1],
      config.secret.signedTokenString
    );
    req.auth = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

// Check if the user is authentificate / login
exports.isAuth = (req, res, next) => {
  try {
    const user = req.user && req.auth && req.user._id == req.auth._id;

    if (!user) {
      return res.status(401).json({ error: 'Access denied' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Check if user is Admin
exports.isAdmin = (req, res, next) => {
  const user = req.user && req.auth && req.user.role == 'Admin';

  if (!user) return res.status(401).json({ error: 'Acces danied' });
  next();
};
