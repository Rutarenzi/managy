const mongoose = require('mongoose');

const assetItemReference = mongoose.Schema({
    name: { type: String, required: true },
    assetCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'assetCategory', required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
assetItemReference.set('timestamps', true)
module.exports.assetItemReference = mongoose.model('assetItemReference', assetItemReference);