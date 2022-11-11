const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    customerId: String,
    productId: String,
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Transactions', TransactionSchema);