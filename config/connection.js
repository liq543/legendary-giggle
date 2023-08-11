const Sequelize = require('sequelize');
require('dotenv').config();  // This npm package helps you to use environment variables.

let sequelize;

// If you have the DATABASE_URL env variable (Heroku + ClearDB), use that
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false, // Optional: Set to true if you want to see SQL queries in the logs
  });
} else {
  // Otherwise, use local .env configurations
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306  // Default MySQL port
  });
}

module.exports = sequelize;
