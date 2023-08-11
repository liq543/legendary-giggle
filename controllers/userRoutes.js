const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 

        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

        req.session.user = newUser;
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
