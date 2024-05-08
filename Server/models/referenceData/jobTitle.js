const mongoose = require('mongoose');

const jobTitle = mongoose.Schema({
    name: { type: String, required: true },
    staffLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'staffLevel' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

jobTitle.set('timestamps', true);

module.exports.jobTitleModel = mongoose.model('jobTitle', jobTitle);