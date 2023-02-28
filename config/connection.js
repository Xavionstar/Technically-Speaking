const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//my connection to the sequelize and mysql, uses the env file to keep my personal data safe
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );

module.exports = sequelize;