const mongoose = require('mongoose');

const identifyDocumentType = mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

identifyDocumentType.set('timestamps', true);

module.exports.identifyDocumentTypeModel = mongoose.model('identifyDocumentType', identifyDocumentType);