// User.js (models/User.js)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  url: {type: String}
});

module.exports = mongoose.model('User', userSchema);
