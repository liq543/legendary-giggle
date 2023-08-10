const { Guess } = require('../models');

const guessData = [
    {
        userId: 2,
        soundId: 1,
        guess: 'elephant',
        isCorrect: true
    },
    // ... add more samples
];

const seedGuesses = () => Guess.bulkCreate(guessData);

module.exports = seedGuesses;
