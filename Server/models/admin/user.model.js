const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    role: {type: String, default: 'USER'}
})

module.exports.userModel = mongoose.model('User', userModel);