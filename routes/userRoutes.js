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
        console.log("Attempting registration with data:", req.body); // Diagnostic log for incoming registration data

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(req.body.email)){
            return res.status(400).json({sucess: false, message: 'Invalid email format'});
        }
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };

        console.log("Hashed password and constructed new user object:", newUser); // Diagnostic log for constructed user
        
        // Assuming User is your Sequelize model
        const createdUser = await User.create(newUser); 
        console.log("User created successfully:", createdUser.toJSON()); // Diagnostic log for created user

        res.json({ success: true, message: 'Registration successful' });

    } catch (error) {
        console.error("Error during registration:", error); // Diagnostic log for errors during registration
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            console.log("User not found with email:", req.body.email); // Diagnostic log
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            console.log("Password mismatch for user:", req.body.email); // Diagnostic log
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // If authenticated:
        req.session.username = user.name;  // Storing username in session
        console.log("User", user.name, "logged in successfully!"); // Diagnostic log
        res.json({ success: true, message: 'Login successful' });

    } catch (error) {
        console.error("Error during login:", error); // Diagnostic log
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});


module.exports = router;
