const { Guess } = require('../models');

const guessData = [
    {
        userId: 4,
        soundId: 4,
        guess: 'elephant',
        isCorrect: true
    },
    // ... add more samples
];

const seedGuesses = () => Guess.bulkCreate(guessData);

module.exports = seedGuesses;
