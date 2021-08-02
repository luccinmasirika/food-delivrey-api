const { Config, Devise } = require('../models/Config.model');
const { GetService } = require('./get.service');

async function serviceConfigUpdate(params) {
  await Config.updateOne({}, { $set: params }, { upsert: true });
}

async function serviceDeviseCreate(params) {
  const data = new Devise(params);
  await data.save();
}

async function serviceDeviseUpdate(params, id) {
  await Devise.updateOne({ _id: id }, { $set: params }, { upsert: true });
}

async function readAllDeviseService() {
  return await Devise.find().exec();
}
async function serviceReadConfig() {
  return await Config.findOne({}).populate('devise').exec();
}

module.exports = {
  serviceConfigUpdate,
  serviceDeviseUpdate,
  serviceDeviseCreate,
  serviceReadConfig,
  readAllDeviseService,
};
