// authService.js (services/authService.js)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (username, password,url) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword,url });
    await user.save();
    return { message: 'User created successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { signup, login };
