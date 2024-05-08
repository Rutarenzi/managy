const mongoose = require('mongoose');

const staffLevels = mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('staffLevels', staffLevels);