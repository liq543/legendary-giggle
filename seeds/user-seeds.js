const { User } = require('../models');

const userData = [
    {
        username: 'alice',
        password: 'password1234' // Remember to hash this before inserting in a real-world scenario
    },
    {
        username: 'bob',
        password: 'password5678'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
