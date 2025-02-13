const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { registerValidator } = require('../validation/schema.validate');
const { validationResult } = require('express-validator');

const router = express.Router();

router.post('/register', registerValidator, async (req, res) => {
  const { username, email, address, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return res.status(400).json({ errors: errorMessages[0] });
  }
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, address, password: hashedPassword });
    await newUser.save();
    res.status(201).json({message: 'User registered successfully'});
  } catch (err) {
    const errors = validationResult(req);
    res.status(400).json({message: errors.array()[0].msg});
  }
});

module.exports = router;