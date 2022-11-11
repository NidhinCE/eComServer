const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    productId: String,
    customerId: String,
    price: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);