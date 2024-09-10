const mongoose = require("mongoose");

const dikhpatiSchema = new mongoose.Schema({
    "0": [{ type: String }],
    "1": [{ type: String }],
    "2": [{ type: String }],
    "3": [{ type: String }],
    "4": [{ type: String }],
    "5": [{ type: String }],
    "6": [{ type: String }],
    "7": [{ type: String }],
    _id: mongoose.Schema.Types.ObjectId  // MongoDB ObjectId
}, { collection: 'Dikhpati' });

const Dikhpati = mongoose.model('Dikhpati', dikhpatiSchema);

module.exports = Dikhpati;
