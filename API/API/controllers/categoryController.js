const categoryService = require('../services/categoryService');
const { validateCategory } = require('../validators/categoryValidator');

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({"data":categories});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createCategory,
  getAllCategories
};
