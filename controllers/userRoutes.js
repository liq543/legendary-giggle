const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// Add more routes as required

module.exports = router;

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password, // TODO: Add hashing before storing password
        });
        req.session.user = newUser;
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add login route and others as required