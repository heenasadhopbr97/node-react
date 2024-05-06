const express = require('express');
const productController = require('../controllers/productController');
const { validateProduct } = require('../validators/productValidator');

const router = express.Router();

// Routes for product
router.post('/', validateProduct, productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router;
