const mongoose = require('mongoose');

const ModeloExemplo = new mongoose.Schema({
  autor: String,
  content: Number,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ModeloExemplo', ModeloExemplo);
