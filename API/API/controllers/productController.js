const productService = require('../services/productService');
const { validateProduct } = require('../validators/productValidator');

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getProducts = async (req, res) => {
    try {
      // Check if categoryId parameter exists in the request
      const categoryId = req.query.categoryId;
      let products;
      if (categoryId) {
        products = await productService.filterProductsByCategory(categoryId);
      } else {
        products = await productService.getAllProducts();
      }
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

module.exports = {
  createProduct,
  getProducts
};
