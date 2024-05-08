const mongoose = require('mongoose');

const assetMaintenanceLevel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },
    
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

assetMaintenanceLevel.set('timestamps', true)
module.exports.assetMaintenanceLevel = mongoose.model('assetMaintenanceLevel', assetMaintenanceLevel);