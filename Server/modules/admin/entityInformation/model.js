const mongoose = require('mongoose');

const entityInformation = mongoose.Schema({
    name: {type: String,required: true},
    address: {type: String,required: true},
    telephone: {type: String,required: true},
    email: {type: String,required: true},
    blackListed: Boolean,
    website: {type: String,required: true},
    VATNo: {type: String,required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('entityInformation', entityInformation);