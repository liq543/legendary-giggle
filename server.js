const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');  // <-- Changed the name to exphbs
const userRoutes = require('./controllers/userRoutes');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const app = express();
const multer = require('multer');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

// Route for uploading audio files
app.post("/upload", upload.single("audio"), async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "No file received" });
    }

    console.log("File saved to:", req.file.path);  // This will print the path to the saved file.

    res.json({ success: true, filepath: req.file.path });
});

app.use(express.static('public')); 
app.use('/users', userRoutes);

// Use exphbs to setup the handlebars engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('layouts/main');  // This assumes you have a main.handlebars in your views directory.
});

app.get('/soundtest', (req, res) => {
    res.render('soundpage');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
