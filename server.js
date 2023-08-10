// server.js
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
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
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
