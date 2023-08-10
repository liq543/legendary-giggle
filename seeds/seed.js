// seed.js
const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
const seedSounds = require('./sound-seeds');
const seedGuesses = require('./guess-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedSounds();
    console.log('\n----- SOUNDS SEEDED -----\n');

    await seedGuesses();
    console.log('\n----- GUESSES SEEDED -----\n');

    process.exit(0);
};

seedAll();
