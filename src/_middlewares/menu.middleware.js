const { Menu, Category } = require('../models/Menu.model');
const AppHttpError = require('../_helpers/appHttpError');

// Get type by ID from params
async function getMenuByID(req, res, next, id) {
  try {
    const menu = await Menu.findById(id).exec();
    if (!menu) return res.status(400).json({ error: "Le menu n'existe pas" });
    req.menu = menu;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

// Get category by ID from params
async function getCategoryByID(req, res, next, id) {
  try {
    const category = await Category.findById(id).exec();
    if (!category)
      return res.status(400).json({ error: "La catégorie n'existe pas" });
    req.category = category;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function checkName(req, res, next) {
  try {
    const data = await Menu.findOne({
      nom: req.body.nom,
      ets: req.body.ets,
    }).exec();
    if (data && data.nom) {
      return next(new AppHttpError('Ce nom déjà pris', 400));
    }
    return next();
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function checkCategoryName(req, res, next) {
  try {
    const data = await Category.findOne({
      nom: req.body.nom,
    }).exec();
    if (data && data.nom) {
      return next(new AppHttpError('Ce nom déjà pris', 400));
    }
    return next();
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = { checkName, checkCategoryName, getMenuByID, getCategoryByID };
