// models/Word.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Word extends Model {}

Word.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'word',
  timestamps: false  // Only if your table doesn't have 'createdAt' and 'updatedAt'
});

module.exports = Word;
