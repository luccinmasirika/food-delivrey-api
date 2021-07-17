const AppHttpError = require('../_helpers/appHttpError');
const { GetService } = require('../services/get.service');
const { readAllClient } = require('../services/client.service');

exports.readAllClient = async (req, res, next) => {
  try {
    const client = await readAllClient(req.query);
    if (!client.total) {
      next(new AppHttpError('Pas de client trouvé', 400));
    }
    res.json(client);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
};
