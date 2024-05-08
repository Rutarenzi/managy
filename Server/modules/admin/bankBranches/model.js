const mongoose = require('mongoose');

const bankBranches = mongoose.Schema({
    name: String,
    bank: { type: mongoose.Schema.Types.ObjectId, ref: 'banks' },
})

module.exports = mongoose.model('BankBranches', bankBranches);