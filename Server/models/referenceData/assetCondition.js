const mongoose = require('mongoose');

const assetCondition = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
assetCondition.set('timestamps', true)
module.exports = mongoose.model('assetCondition', assetCondition);