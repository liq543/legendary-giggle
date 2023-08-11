const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const userRoutes = require('./routes/userRoutes');
const soundRoutes = require('./routes/soundRoutes'); // Import the new module
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxage: 60000 }
}));

app.use(express.static('public')); 
app.use('/', userRoutes);
app.use('/', soundRoutes);  // Use the sound routes module

// Use exphbs to setup the handlebars engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('login');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
