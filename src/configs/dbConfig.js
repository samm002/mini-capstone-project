const { Sequelize } = require('sequelize');
const config = require('../database/config/config')[process.env.NODE_ENV];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: process.env.NODE_ENV !== 'production',
  }
);

const User = require('../database/models/user')(sequelize, Sequelize.DataTypes);
const Prediction = require('../database/models/prediction')(
  sequelize,
  Sequelize.DataTypes
);
const NutritionDetail = require('../database/models/nutrition_detail')(
  sequelize,
  Sequelize.DataTypes
);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sq: sequelize,
  testDbConnection,
  User,
  Prediction,
  NutritionDetail,
};
