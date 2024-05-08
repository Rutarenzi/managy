const mongoose = require('mongoose');

const assetMovements = new mongoose.Schema({
  asset: {
    type: String,
    required: true
  },
  destinationOffice: {
    type: String,
    required: true
  },
  dateOfMovement: {
    type: Date,
    required: true
  },
  movementReason: {
    type: String,
    required: true
  },
  requestedBy: {
    type: String,
    required: true
  },
  approvedBy: {
    type: String,
    required: true
  },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, { timestamps : true });

module.exports.assetMovements = mongoose.model('AssetMovement', assetMovements);
