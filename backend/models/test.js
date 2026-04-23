const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  tervehdys: {
    type: String,
  },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Test', TestSchema, 'test');
