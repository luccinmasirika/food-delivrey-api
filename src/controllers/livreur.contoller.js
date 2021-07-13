const {
  createAccout,
  isAuth,
  isActif,
} = require('../services/livreur.service');
const {
  getAllLivreur,
  updateLivreur,
  deleteLivreur,
  disableAnableLivreur
} = require('../services/user.service');

const AppHttpError = require('../_helpers/appHttpError');

exports.signup = async (req, res) => {
  const defaultAvatar = '/images/avatar.png';
  const avatar = req.file ? `/images/${req.file.filename}` : defaultAvatar;
  const livreur = { ...req.body, avatar };

  try {
    await createAccout(livreur);
    return res.status(201).json({ message: 'Livreur créé 😃' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    try {
      const livreurData = await isAuth(email, password, next);
      await isActif(email);
      return res.json(livreurData);
    } catch (error) {
      return next(new AppHttpError(error.message, error.status));
    }
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue', 500));
  }
};

exports.read = async (req, res) => {
  try {
    return res.json(req.livreur);
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue !',
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const livreurs = await getAllLivreurs(req.livreur._id);
    if (!livreurs) {
      return res.status(400).json({ error: 'No user found' });
    }
    return res.json(livreurs);
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue !',
    });
  }
};

exports.updateProfile = async (req, res) => {
  const update = req.file
    ? { ...req.body, avatar: `/images/${req.file.filename}` }
    : { ...req.body };
  try {
    await updateLivreur(req.livreur._id, update);
    return res.json({ message: 'Profil mis à jour 😃' });
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue !',
    });
  }
};

exports.updateInfo = async (req, res) => {
  const update = req.file
    ? { ...req.body, photo_carte: `/images/${req.file.filename}` }
    : { ...req.body };
  try {
    await updateLivreur(req.user._id, update);
    return res.json({ message: 'Informations mises à jour 😃' });
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue !',
    });
  }
};

exports.deleteLivreur = async (req, res) => {
  try {
    await deleteLivreur(req.livreur._id);
    return res.json('User deleted');
  } catch (error) {
    return res.status(500).json({ error: 'Une erreur est survenue !' });
  }
};

exports.disableAnableLivreur = async (req, res) => {
  try {
    await disableAnableLivreur(req.livreur._id);
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {}
};
