const { createAccout, isAuth, isActif } = require('../services/auth.service');
const AppHttpError = require('../_helpers/appHttpError');

exports.signup = async (req, res) => {
  //set a default avatar image
  const defaultAvatar = 'images/avatar.png';
  //get avatar image from req.file
  const avatar = req.file ? `images/${req.file.filename}` : defaultAvatar;

  //create new user
  const user = { ...req.body, avatar };

  try {
    await createAccout(user);
    return res.status(201).json({ message: 'Utilisateur créé 😃' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    try {
      const userData = await isAuth(email, password, next);
      await isActif(email);
      return res.json(userData);
    } catch (error) {
      return next(new AppHttpError(error.message, error.status));
    }
  } catch (error) {
    return next(new AppHttpError('An error has occurred', 500));
  }
};
