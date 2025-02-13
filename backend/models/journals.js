const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  key: { type: String, required: true},
  date: { type: Date}, 
  body: { type: String},
});

module.exports = mongoose.model('Journal', journalSchema);