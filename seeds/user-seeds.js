const { User } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
    {
        name: 'alice',   // Assuming you updated your model to have 'name' instead of 'username'
        email: 'alice@example.com',
        password: bcrypt.hashSync('password1234', 10) // Hashed password
    },
    {
        name: 'bob',
        email: 'bob@example.com',
        password: bcrypt.hashSync('password5678', 10) // Hashed password
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;