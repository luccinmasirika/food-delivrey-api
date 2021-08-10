const Menu = require('../models/Menu.model');
const AppHttpError = require('../_helpers/appHttpError');
const slugify = require('slugify');

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

async function checkName(req, res, next) {
  if (req.body.nom) {
    try {
      const slug = slugify(req.body.nom, { lower: true, strict: true });
      const data = await Menu.findOne({
        slug,
      }).exec();

      if (
        req.query._id &&
        data &&
        data._id.toString() === req.query._id.toString()
      ) {
        return next();
      }

      if (data) {
        return next(new AppHttpError('This name already taken', 400));
      }
      return next();
    } catch (error) {
      return next(
        new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
      );
    }
  }
  next();
}

module.exports = { checkName, getMenuByID };
