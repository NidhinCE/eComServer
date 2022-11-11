const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    eMail: String,
    phoneNumber: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);