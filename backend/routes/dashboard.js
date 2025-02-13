const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();


router.get('/user', async (req, res) => {
  const token = req.headers['authorization'];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json({ 
      username: user.username,
      email: user.email,
      address: user.address,
     });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;