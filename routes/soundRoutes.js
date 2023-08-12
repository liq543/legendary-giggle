const express = require('express');
const multer = require('multer');
const Sound = require('../models/Sound');
const { authenticateToken } = require('./routehelper'); // Adjust the path to your userRoutes.js file
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/audio');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.wav');
    }
});

const upload = multer({ storage: storage });

// Route for uploading audio files
router.post("/upload", upload.single("audio"), authenticateToken, async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "No file received" });
    }

    console.log("File saved to:", req.file.path);  // This will print the path to the saved file.

    // Save sound metadta to the database

try {
    const newSound = await Sound.create({
        userId: req.session.userinfo.id, // Assuming you have the user info in the req object
        categoryId: 4, // PLACEHOLDER LOL HAHA XD :3
        soundFilePath: req.file.path,
        wordOrPhrase: 'test' // PLACEHOLDER LOL HAHA XD :3
    });
    res.json({ success: true, filepath: req.file.path });
} catch (err) {
    console.log("Error saving sound to the database:", err);
    res.status(500).json({ success: false, message: "Error saving sound to the database" });
}
});

// Route to get sound by ID
router.get("/sound/:id", authenticateToken, async (req, res) => {
    try {
        const sound = await Sound.findByPk(req.params.id);
        if (!sound) {
            return res.status(404).json({ message: "Sound not found" });
        }
        res.json(sound);
    } catch (error) {
        console.error("Error retrieving sound:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get('/soundtest', authenticateToken, (req, res) => {
    res.render('soundpage');
});

module.exports = router;
