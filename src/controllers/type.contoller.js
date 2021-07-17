const Type = require('../models/Type.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { GetService } = require('../services/get.service');

async function constrollorCreateService(req, res, next) {
  try {
    const image = req.file
      ? `/images/${req.file.filename}`
      : '/images/type.png';
    const data = { ...req.body, image };
    const response = new ServiceCreate(data, Type);
    await response.create();
    res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

module.exports = { constrollorCreateService };
