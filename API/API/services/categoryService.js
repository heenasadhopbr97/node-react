const Category = require('../models/category.model');

const createCategory = async (categoryData) => {
  try {
    const { name, description, parent } = categoryData;

    let category = new Category({
      name,
      description,
      parent
    });

    // If parent category is provided, validate it
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        throw new Error('Parent category not found');
      }
      category.ancestors = [...parentCategory.ancestors, parent];
    }

    await category.save();

    return category;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories
};
