const User = require('./User');
const Sound = require('./Sound.js');
const Category = require('./Category');
const Guess = require('./Guess');

User.hasMany(Sound, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Sound.belongsTo(User, {
  foreignKey: 'userId',
});

Sound.belongsTo(Category, {
  foreignKey: 'categoryId',
});

Category.hasMany(Sound, {
  foreignKey: 'categoryId',
});

User.hasMany(Guess, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Guess.belongsTo(User, {
  foreignKey: 'userId',
});

Sound.hasMany(Guess, {
  foreignKey: 'soundId',
  onDelete: 'CASCADE',
});

Guess.belongsTo(Sound, {
  foreignKey: 'soundId',
});

module.exports = { User, Sound, Category, Guess };
