const bcrypt = require('bcryptjs');
const Livreur = require('../models/Livreur.model');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const AppHttpError = require('../_helpers/appHttpError');

async function createAccout(params) {
  const { password } = params;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const account = new Livreur({
    ...params,
    hashed_password: hash,
  });
  await account.save();
}

async function isAuth(email, password) {
  const account = await Livreur.findOne({ email }).exec();
  if (!account) {
    throw new AppHttpError("Ce compte n'existe pas !", 403);
  }

  if (!(await bcrypt.compare(password, account.hashed_password))) {
    throw new AppHttpError('Le mot de passe est incorrecte', 403);
  }

  const token = await generateToken(account);
  const { _id, firstName, lastName, avatar, role } = account;
  return { user: { _id, firstName, email, avatar, lastName, role }, token };
}

async function isActif(email) {
  const account = await Livreur.findOne({ email, disable: true }).exec();
  if (account) {
    throw new AppHttpError('Désolé, votre compte a été désactivé', 403);
  }
}

async function generateToken(params) {
  const token = jwt.sign(
    {
      _id: params._id,
    },
    config.secret.signedTokenString,
    { expiresIn: '24h' }
  );
  return token;
}

module.exports = {
  createAccout,
  isAuth,
  generateToken,
  isActif,
};
