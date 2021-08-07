const Type = require('../models/Type.model');
const AppHttpError = require('../_helpers/appHttpError');
const slugify = require('slugify');

// Get type by ID from params
async function getTypeByID(req, res, next, id) {
  try {
    const type = await Type.findById(id).exec();
    if (!type) return res.status(400).json({ error: "Le type n'existe pas" });
    req.type = type;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function checkName(req, res, next) {
  if (req.body.nom) {
    const slug = slugify(req.body.nom, { lower: true, strict: true });
    try {
      const data = await Type.findOne({
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

module.exports = { checkName, getTypeByID };
