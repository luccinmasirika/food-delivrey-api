const { seriveCreateUser } = require('../services/auth.service');
const AppHttpError = require('../_helpers/appHttpError');

async function createUser(req, res, next) {
  try {
    const user = await seriveCreateUser(req.body);
    if (!user) throw new AppHttpError('Unable to create user');
    return user;
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };
