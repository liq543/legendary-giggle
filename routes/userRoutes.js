const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Adjust the path to your User model

const router = express.Router();

// GET route for the login page
router.get('/login', (req, res) => {
    res.render('login');  // Renders the login.handlebars view
});

// GET route for the registration page
router.get('/register', (req, res) => {
    res.render('register');  // Renders the register.handlebars view
});



// Registration Route
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };
        
        // Assuming User is your Sequelize model
        await User.create(newUser);
        res.json({ success: true, message: 'Registration successful' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // If authenticated:
        req.session.username = user.name;  // Storing username in session
        res.json({ success: true, message: 'Login successful' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});


module.exports = router;
