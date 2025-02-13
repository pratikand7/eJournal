const express = require('express');
const Journal = require('../models/journals');
const router = express.Router();

router.get('/journals', async (req, res) => {
  try {
    const {key} = req.query;
    const journals = await Journal.find(key ? { key } : {});
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/journals', async (req, res) => {
  const { key, date, body } = req.body;
  try {
    const newJournal = new Journal({ key, date, body });
    await newJournal.save();
    res.status(201).json({ message: 'Journal created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Journal creation failed' });
  }
});

router.delete('/journals/:id', async (req, res) => {
  const { id } = req.params.id;
  try {
    await Journal.findByIdAndDelete(id);
    res.json({ message: 'Journal deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Journal deletion failed' });
  }
});

module.exports = router;