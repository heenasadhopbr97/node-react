const mongoose = require('mongoose');

// Define schema for category
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  ancestors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Category model
const Category = mongoose.model('category', categorySchema);

module.exports = Category;
