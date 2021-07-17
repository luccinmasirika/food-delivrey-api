const User = require('../models/User.model');
const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const { GetService } = require('./get.service');

async function getUser(params) {
  const user = await User.findOne(params).exec();
  return user;
}

async function getAllUser() {
  const users = await User.find({})
    .sort({ disable: 1, updatedAt: 0, createdAt: 1 })
    .exec();
  return users;
}

async function updateUser(params, update) {
  let account = { ...update };
  const { password } = update;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    account = {
      ...update,
      hashed_password: hash,
    };
  }
  await User.updateOne({ _id: params }, { $set: account }).exec();
  return true;
}

async function deleteUser(params) {
  await User.findOneAndDelete({ _id: params }).exec();
  return true;
}

async function disableAnableUser(params) {
  const user = await User.findOne({ _id: params }).exec();
  await User.updateOne({ _id: params }, { $set: { disable: !user.disable } });
  return true;
}

async function readAllUser(params) {
  const filters = { role: 1 };
  const { page, limit, nom, disable, ets } = params;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const regrex = { $regex: nom || '', $options: 'i' };

  if (nom) {
    filters.$or = [{ firstName: regrex }, { lastName: regrex }];
  }

  if (disable) {
    filters.disable = disable;
  }

  if (ets) {
    filters.ets = ets;
  }

  return new GetService(User.find(), query, filters).pagination();
}

async function readAllAdmin(params) {
  const filters = { role: 0 };
  const { page, limit, nom, disable } = params;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const regrex = { $regex: nom || '', $options: 'i' };

  if (nom) {
    filters.$or = [{ firstName: regrex }, { lastName: regrex }];
  }

  if (disable) {
    filters.disable = disable;
  }

  return new GetService(User.find(), query, filters).pagination();
}

module.exports = {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  disableAnableUser,
  readAllUser,
  readAllAdmin,
};
