const express = require('express');
const multer = require('multer');

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
router.post("/upload", upload.single("audio"), async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "No file received" });
    }

    console.log("File saved to:", req.file.path);  // This will print the path to the saved file.

    res.json({ success: true, filepath: req.file.path });
});

router.get('/soundtest', (req, res) => {
    res.render('soundpage');
});

module.exports = router;
