const mongoose = require('mongoose');
const chalk = require('chalk')
const { config } = require('../config/config');

/**
 * CONNECTION WITH MONGODB || MONGOOSE
 */
const option = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const onMongooseConnect = async (uri, option) => {
  try {
    await mongoose.connect(uri, option)
    console.log(chalk.green.bold('Server connected to the database'))
  } catch (error) {
    console.log(chalk.red.bold(`Database connexio failed. ${error}`))
  }
}

onMongooseConnect(config.database.uri, option)
