const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', UserSchema);
