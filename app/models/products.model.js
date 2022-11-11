const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    categoryId: String,
    categoryName: String,
    name: String,
    price: Number,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', ProductsSchema);