// seeders/category-seeds.js
const { Category } = require('../models');

const categoryData = [
    { name: 'Animal Sounds' },
    { name: 'Machinery Sounds' },
    // ... add more as needed
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
