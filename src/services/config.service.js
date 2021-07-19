const { Config, Devise } = require('../models/Config.model');

async function serviceConfigUpdate(params) {
  await Config.updateOne({}, { $set: params }, { upsert: true });
}

async function serviceDeviseCreate(params) {
  const data = new Devise(params);
  console.log(data);
  await data.save();
}

async function serviceDeviseUpdate(params, id) {
  await Devise.updateOne({ _id: id }, { $set: params }, { upsert: true });
}

module.exports = {
  serviceConfigUpdate,
  serviceDeviseUpdate,
  serviceDeviseCreate,
};
