const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    default: null
  },
  rating: {
    type: Number,
    default: null
  },
  inStock: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
