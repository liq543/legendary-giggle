const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');  // <-- Changed the name to exphbs
const userRoutes = require('./controllers/userRoutes');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.render('layouts/main');  // This assumes you have a main.handlebars in your views directory.
});

// Use exphbs to setup the handlebars engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
