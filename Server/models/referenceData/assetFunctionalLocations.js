const mongoose = require('mongoose');
const assetFunctionalLocation = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department' ,  required: true},
    location: {type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
assetFunctionalLocation.set('timestamps', true)
module.exports.assetFunctionalLocation = mongoose.model('assetFunctionalLocation', assetFunctionalLocation);