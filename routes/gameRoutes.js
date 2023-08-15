const express = require('express');
const multer = require('multer');
const Sound = require('../models/Sound');
const { authenticateToken } = require('./routehelper'); 
const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
    res.render('dashboard');
});

module.exports = router;



