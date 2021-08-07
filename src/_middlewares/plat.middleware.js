const Plat = require('../models/Plat.model');
const AppHttpError = require('../_helpers/appHttpError');
const slugify = require('slugify');

// Get type by ID from params
async function getPlatByID(req, res, next, id) {
  try {
    const plat = await Plat.findById(id).exec();
    if (!plat) return res.status(400).json({ error: "Le type n'existe pas" });
    req.plat = plat;
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
      const check = await Plat.findOne({ _id: req.query._id }, { ets: 1 });
      const data = await Plat.findOne({
        slug,
        'ets._id': req.body.ets || check.ets,
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

module.exports = { checkName, getPlatByID };
