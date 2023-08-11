const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const userRoutes = require('./routes/userRoutes');
const soundRoutes = require('./routes/soundRoutes');
const { initializeSocket } = require('./serverjs/socketLogic');  // Import socket logic
const http = require('http');  // Import the http module
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
app.use('/', soundRoutes);
app.use('/sockettest', (req, res) => {
    res.render('sockettest');
});

// Use exphbs to setup the handlebars engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('login');
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);  // Create server using http

initializeSocket(server);  // Pass the server to initialize socket

server.listen(PORT, () => {  // Change this line to use the created server
    console.log(`Server started on port ${PORT}`);
});
