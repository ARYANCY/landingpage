const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: String,
  email: String,
  avatar: String
});

module.exports = mongoose.model('User', userSchema);
