const mongoose = require('mongoose');

const educationLevels = mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('educationLevels', educationLevels);