const Product = require('../models/product.model');

const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllProducts = async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  const filterProductsByCategory = async (categoryId) => {
    try {
      const products = await Product.find({ category: categoryId });
      return products;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  

module.exports = {
  createProduct,
  getAllProducts,
  filterProductsByCategory
};
