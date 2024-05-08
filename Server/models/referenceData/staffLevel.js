const mongoose = require('mongoose');

const staffLevel = mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

staffLevel.set('timestamps', true);

const staffLevelModel = mongoose.model('staffLevel', staffLevel);
module.exports = staffLevelModel