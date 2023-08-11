const Sequelize = require('sequelize');
require('dotenv').config();  // This npm package helps you to use environment variables.

let sequelize;
let dev = 1;
// If you have the DATABASE_URL env variable (Heroku + ClearDB), use that
if (dev = 1) {
  sequelize = new Sequelize(process.env.DB_DATABASE_URL, {
    dialect: 'mysql',
    logging: true, // Optional: Set to false if you dont want to see logs
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
