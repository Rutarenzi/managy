const mongoose = require('mongoose');

const assetCategory = mongoose.Schema({
    name: {type: String, required: true},
    usefulEconomicYears: {type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required:true}
})
assetCategory.set('timestamps', true)
module.exports.assetCategory = mongoose.model('assetCategory', assetCategory);