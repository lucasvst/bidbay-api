var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    modality: { type: String, required: true },
    number: { type: String, required: true },
    agency: { type: String, required: true },
	object_description: { type: String, required: true },
    // starts_in: { type: Date },
    starts_in_raw: { type: String },
    edital: { type: String },

});

module.exports = mongoose.model('Opportunity', schema);