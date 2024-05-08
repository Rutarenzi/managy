const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
    department: { type: String, required: true },
    functionalLocation: { type: String, required: true },
    assetCategory: { type: String, required: true },
    assetItem: { type: String, required: true },
    assetCode: { type: String, required: true },
    description: { type: String, required: true },
    serviceStatus: { type: String, required: true },
    assetCondition: { type: String, required: true },
    serialNo: { type: String, required: true },
    note: { type: String, required: true },
    manufacturer: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    vendor: { type: String, required: true },
    acquisitionDate: { type: Date, required: true },
    acquisitionValue: { type: Number, required: true },
    depreciationRate: { type: Number, required: true },
    residualValue: { type: Number, required: true },
    reEvaluationValue: { type: Number, required: true },
    reEvaluationDate: { type: Date, required: true },
    creator:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {  timestamps : true });

const Asset = mongoose.model('Asset', assetSchema);

module.exports.Asset = Asset;
