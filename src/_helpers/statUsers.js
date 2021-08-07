const User = require('../models/User.model');

async function statsClient(action, user) {
  switch (action) {
    case 'PAYIED':
      await User.updateOne({ _id: user }, { $inc: { 'stat.un': 1 } });
      break;
    case 'DENIED':
      await User.updateOne({ _id: user }, { $inc: { 'stat.deux': 1 } });
      break;
    case 'CANCELED':
      await User.updateOne({ _id: user }, { $inc: { 'stat.trois': 1 } });
      break;
  }
}

async function statsLivreur(action, user) {
  switch (action) {
    case 'CLOSED':
      await User.updateOne({ _id: user }, { $inc: { 'stat.un': 1 } });
      break;
    case 'PENDING':
      await User.updateOne({ _id: user }, { $inc: { 'stat.deux': 1 } });
      break;
    case 'DELIVRED':
      await User.updateOne({ _id: user }, { $inc: { 'stat.trois': 1 } });
      break;
    case 'UNPENDING':
      await User.updateOne({ _id: user }, { $inc: { 'stat.deux': -1 } });
      break;
  }
}

module.exports = {
  statsClient,
  statsLivreur,
};
