const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const AppHttpError = require('../_helpers/appHttpError');
const slugify = require('slugify');

async function seriveCreateUser(data) {
  const { username, email, password, role } = data;
  const slug = slugify(username, { lower: true, replacement: '', strict: true });
  try {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    const user = new User({ username, email, hashedPassword: hash, role, slug });
    return await user.save();
  } catch (error) {
    throw new AppHttpError(error);
  }
}

module.exports = { seriveCreateUser };
