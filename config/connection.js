// Importing necessary npm packages
const Sequelize = require('sequelize');
require('dotenv').config();  // This npm package helps you to use environment variables.

// Setting up the connection to the MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306  // Default MySQL port
});

module.exports = sequelize;
