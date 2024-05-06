const express = require('express');
const categoryController = require('../controllers/categoryController');
const { validateCategory } = require('../validators/categoryValidator');

const router = express.Router();

// Routes for category
router.post('/', validateCategory, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;
