const { Config, Devise } = require('../models/Config.model');

async function serviceConfigUpdate(params) {
  await Config.updateOne({}, { $set: params }, { upsert: true });
}

async function serviceDeviseUpdate(params, filter) {
  await Config.updateOne(filter, { $set: params }, { upsert: true });
}

module.exports = { serviceConfigUpdate, serviceDeviseUpdate };
