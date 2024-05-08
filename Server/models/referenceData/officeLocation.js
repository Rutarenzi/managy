const mongoose = require('mongoose');

const officeLocation = mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

officeLocation.set('timestamps', true);

module.exports.officeLocationModel = mongoose.model('officeLocation', officeLocation);