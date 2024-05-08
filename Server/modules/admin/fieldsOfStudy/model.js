const mongoose = require('mongoose');

const fieldsStudy = mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('fieldsStudy', fieldsStudy);