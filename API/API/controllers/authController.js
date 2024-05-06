// authController.js (controllers/authController.js)
const authService = require('../services/authService');

const signup = async (req, res) => {
  const { username, password,url } = req.body;
  try {
    const response = await authService.signup(username, password,url);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await authService.login(username, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
