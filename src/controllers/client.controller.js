const AppHttpError = require('../_helpers/appHttpError');
const { createAccout, isAuth, isActif } = require('../services/auth.service');
const { GetService } = require('../services/get.service');
const { readAllClient } = require('../services/client.service');

exports.signupClient = async (req, res) => {
  const defaultAvatar = 'images/avatar.png';
  const avatar = req.file ? `images/${req.file.filename}` : defaultAvatar;
  const livreur = {
    ...req.body,
    avatar,
    stat: {
      un: 0,
      deux: 0,
      trois: 0,
    },
  };

  try {
    await createAccout(livreur);
    return res.status(201).json({ message: 'Livreur créé 😃' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.readAllClient = async (req, res, next) => {
  try {
    const client = await readAllClient(req.query);
    res.json(client);
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
};
