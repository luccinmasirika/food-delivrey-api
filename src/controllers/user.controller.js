const {
  getAllUser,
  updateUser,
  deleteUser,
  disableAnableUser,
  readAllUser,
  readAllAdmin,
} = require('../services/user.service');
const { GetService } = require('../services/get.service');
const AppHttpError = require('../_helpers/appHttpError');

exports.read = async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const users = await getAllUser(req.user._id);
    if (!users) {
      return res.status(400).json({ error: "Pas d'utilisateur trouvé" });
    }
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
};

exports.update = async (req, res) => {
  const update = req.file
    ? { ...req.body, avatar: `images/${req.file.filename}` }
    : { ...req.body };
  try {
    await updateUser(req.user._id, update);
    return res.json({ message: 'Utilisateur mis à jour 😃' });
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
};

exports.updateInfo = async (req, res) => {
  const update = req.file
    ? { ...req.body, photoCarte: `images/${req.file.filename}` }
    : { ...req.body };
  try {
    await updateUser(req.user._id, update);
    return res.json({ message: 'Informations mises à jour 😃' });
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await deleteUser(req.user._id);
    return res.json('User deleted');
  } catch (error) {
    return res.status(500).json({ error: 'Il y a une erreur !' + error });
  }
};

exports.disableAnableUser = async (req, res) => {
  try {
    await disableAnableUser(req.user._id);
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {}
};

exports.readAllUser = async (req, res, next) => {
  try {
    const query = { ...req.query, ets: req.user.ets };
    const users = await readAllUser(query);
    if (!users.total) {
      next(new AppHttpError('Il y a aucun utilisateur', 404));
    }
    res.json(users);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error));
  }
};

exports.readAllAdmin = async (req, res, next) => {
  try {
    const users = await readAllAdmin(req.query);
    if (!users.total) {
      next(new AppHttpError('Il y a aucun utilisateur', 404));
    }
    res.json(users);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error));
  }
};
