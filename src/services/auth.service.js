const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

async function createAccout(params) {
  const { password } = params;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const account = new User({
    ...params,
    hashed_password: hash,
  });
  await account.save();
}

async function isAuth(email, password) {
  const account = await User.findOne({ email }).select('hashed_password  _id firstName disable email avatar lastName role');
  const match = await bcrypt.compare(password, account.hashed_password);
  if (!account || !match) {
    return false;
  } else {
    const token = await generateToken(account);
    const { _id, firstName, lastName, email, avatar, role } = account;
    return { user: { _id, firstName, email, avatar, lastName, role }, token };
  }
}

async function isActif(email){
  const account = await User.findOne({email}).exec();
  if(account.disable){
    return false
  }
  return true
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
  isActif
};
