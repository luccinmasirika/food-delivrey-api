const AppHttpError = require('../_helpers/appHttpError');
const { GetService } = require('../services/get.service');
const { readAllClient } = require('../services/client.service');

exports.readAllClient = async (req, res, next) => {
  try {
    const client = await readAllClient(req.query);
    res.json(client);
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
};
