const mongoose = require('mongoose');

const assetServiceStatus = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports.assetServiceStatus = mongoose.model('assetServiceStatus', assetServiceStatus);