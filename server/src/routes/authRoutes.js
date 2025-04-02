const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register route
router.post('/register', async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error('Register error:', error);
    next(error);
  }
});

// Login route
router.post('/login', async (req, res, next) => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    await login(req, res);
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
});

module.exports = router; 