const { Sound } = require('../models');

const soundData = [
    {
        userId: 4,
        categoryId: 1,
        soundFilePath: 'path/to/sound1.mp3',
        wordOrPhrase: 'elephant'
    },
    // ... add more samples
];

const seedSounds = () => Sound.bulkCreate(soundData);

module.exports = seedSounds;
