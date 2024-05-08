const { Schema, model, default: mongoose, Types } = require("mongoose")

const assetCustodyRecordSchema = new Schema({
    assetName: {    
        type: String,
        required: true
    },
    custodian: {
        type: String,
        required: true
    },
    issuedBy: {
        type: String,
        required: true
    },
    issuedOn: {
        type: Date,
        required: true
    },
    receivedBy: {
        type: String,
        required: true
    },
    returnedBy: {
        type: String,
        required: false
    },
    returnReceivedBy: {
        type: String,
        required: true
    },
    returnedOn: {
        type: Date,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps : true })

const AssetCustodyRecord = model('AssetCustodyRecord', assetCustodyRecordSchema)


module.exports = AssetCustodyRecord