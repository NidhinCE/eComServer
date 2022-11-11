const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    Name: String,
    Description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);